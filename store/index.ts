import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockStore, mockQuery } from '../data/dashboardMockData';
import { mockQuery as propertiesMockQuery } from '../data/propertiesMockData';
import { ChartPeriod, PaymentStatus, PropertyViewMode, PropertyTag, UnitCountFilter, VacancyFilter, PriceRangeFilter } from '../types/enums';
import type { KPIData, RevenueDataPoint, Activity, Payment, Property, PropertyFilters } from '../types/schema';

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: mockStore.user,
  reducers: {}
});

// Notifications slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: mockStore.notifications,
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.items.find(item => item.id === action.payload);
      if (notification) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(item => item.read = true);
      state.unreadCount = 0;
    }
  }
});

// Payments slice
const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: mockQuery.recentPayments
  },
  reducers: {
    markPaymentAsPaid: (state, action) => {
      const payment = state.payments.find(p => p.id === action.payload);
      if (payment) {
        payment.status = PaymentStatus.PAID;
      }
    }
  }
});

// Properties slice
const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    viewMode: PropertyViewMode.TABLE,
    filters: {
      search: '',
      status: 'all',
      city: 'all',
      unitCount: 'any',
      vacancy: 'any',
      priceRange: 'any',
      tags: []
    } as PropertyFilters,
    selectedProperties: [] as number[],
    addPropertyModal: {
      isOpen: false,
      isLoading: false
    }
  },
  reducers: {
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSelectedProperties: (state, action) => {
      state.selectedProperties = action.payload;
    },
    togglePropertySelection: (state, action) => {
      const propertyId = action.payload;
      const index = state.selectedProperties.indexOf(propertyId);
      if (index > -1) {
        state.selectedProperties.splice(index, 1);
      } else {
        state.selectedProperties.push(propertyId);
      }
    },
    selectAllProperties: (state, action) => {
      state.selectedProperties = action.payload;
    },
    clearPropertySelection: (state) => {
      state.selectedProperties = [];
    },
    openAddPropertyModal: (state) => {
      state.addPropertyModal.isOpen = true;
    },
    closeAddPropertyModal: (state) => {
      state.addPropertyModal.isOpen = false;
      state.addPropertyModal.isLoading = false;
    },
    setAddPropertyLoading: (state, action) => {
      state.addPropertyModal.isLoading = action.payload;
    }
  }
});

// Helper function to filter properties
const filterProperties = (properties: Property[], filters: PropertyFilters): Property[] => {
  let filteredProperties = [...properties];
  
  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProperties = filteredProperties.filter(property =>
      property.name.toLowerCase().includes(searchTerm) ||
      property.address.toLowerCase().includes(searchTerm)
    );
  }
  
  // Status filter
  if (filters.status !== 'all') {
    filteredProperties = filteredProperties.filter(property =>
      property.status === filters.status
    );
  }
  
  // City filter
  if (filters.city !== 'all') {
    filteredProperties = filteredProperties.filter(property =>
      property.city === filters.city
    );
  }
  
  // Unit count filter
  if (filters.unitCount !== 'any') {
    filteredProperties = filteredProperties.filter(property => {
      const totalUnits = property.units.total;
      switch (filters.unitCount) {
        case '1-5':
          return totalUnits >= 1 && totalUnits <= 5;
        case '6-20':
          return totalUnits >= 6 && totalUnits <= 20;
        case '21+':
          return totalUnits >= 21;
        default:
          return true;
      }
    });
  }
  
  // Vacancy filter
  if (filters.vacancy !== 'any') {
    filteredProperties = filteredProperties.filter(property => {
      const { total, occupied, vacant } = property.units;
      switch (filters.vacancy) {
        case 'available':
          return vacant > 0;
        case 'fully_occupied':
          return vacant === 0;
        case 'partially_vacant':
          return vacant > 0 && occupied > 0;
        default:
          return true;
      }
    });
  }
  
  // Price range filter
  if (filters.priceRange !== 'any') {
    filteredProperties = filteredProperties.filter(property => {
      const revenue = property.monthlyRevenue;
      switch (filters.priceRange) {
        case '0-1000':
          return revenue >= 0 && revenue <= 1000;
        case '1000-2500':
          return revenue > 1000 && revenue <= 2500;
        case '2500-5000':
          return revenue > 2500 && revenue <= 5000;
        case '5000+':
          return revenue > 5000;
        default:
          return true;
      }
    });
  }
  
  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    filteredProperties = filteredProperties.filter(property =>
      filters.tags.some(tag => property.tags.includes(tag))
    );
  }
  
  return filteredProperties;
};

// API slice for data fetching
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Payments', 'Properties'],
  endpoints: (builder) => ({
    getKPIData: builder.query({
      queryFn: () => ({ data: mockQuery.kpiData })
    }),
    getRevenueChart: builder.query({
      queryFn: (period) => {
        // Import here to avoid circular dependency
        const { generateChartData } = require('../data/chartMockData');
        return { data: generateChartData(period || 'monthly') };
      }
    }),
    getActivities: builder.query({
      queryFn: (limit) => ({ data: mockQuery.activities })
    }),
    getRecentPayments: builder.query({
      queryFn: (limit, { getState }) => {
        const state = getState() as any;
        return { data: state.payments.payments };
      },
      providesTags: ['Payments']
    }),
    markPaymentAsPaid: builder.mutation({
      queryFn: (paymentId) => {
        // In a real app, this would make an API call
        return { data: { success: true } };
      },
      invalidatesTags: ['Payments']
    }),
    getProperties: builder.query({
      queryFn: (filters: PropertyFilters) => {
        const filteredProperties = filterProperties(propertiesMockQuery.properties, filters);
        return { data: filteredProperties };
      },
      providesTags: ['Properties']
    }),
    archiveProperties: builder.mutation({
      queryFn: (propertyIds: number[]) => {
        // In a real app, this would make an API call to archive properties
        console.log('Archiving properties:', propertyIds);
        return { data: { success: true, archivedCount: propertyIds.length } };
      },
      invalidatesTags: ['Properties']
    }),
    sendReminders: builder.mutation({
      queryFn: (propertyIds: number[]) => {
        // In a real app, this would make an API call to send reminders
        console.log('Sending reminders for properties:', propertyIds);
        return { data: { success: true, remindersSent: propertyIds.length } };
      }
    }),
    exportPropertiesCSV: builder.mutation({
      queryFn: (propertyIds: number[]) => {
        // In a real app, this would generate and return a CSV download URL
        console.log('Exporting properties to CSV:', propertyIds);
        const timestamp = new Date().toISOString().split('T')[0];
        return { data: { downloadUrl: `/api/export/properties-${timestamp}.csv`, exportedCount: propertyIds.length } };
      }
    }),
    createProperty: builder.mutation({
      queryFn: (propertyData: any) => {
        // Import here to avoid circular dependency
        const { mockContacts } = require('../data/addPropertyMockData');
        
        // In a real app, this would make an API call to create the property
        const newProperty = {
          ...propertyData,
          id: Date.now(), // Generate a temporary ID
          lastPaymentDate: null,
          manager: mockContacts.find((c: any) => c.id === propertyData.managerId && c.role === 'Property Manager'),
          owner: mockContacts.find((c: any) => c.id === propertyData.ownerId && c.role === 'Property Owner')
        };
        
        // Add to mock data (in a real app, this would be handled by the backend)
        propertiesMockQuery.properties.push(newProperty);
        
        console.log('Creating property:', newProperty);
        return { data: newProperty };
      },
      invalidatesTags: ['Properties']
    }),
    getAvailableContacts: builder.query({
      queryFn: () => {
        const { mockContacts } = require('../data/addPropertyMockData');
        return { data: mockContacts };
      }
    }),
    getAvailableCities: builder.query({
      queryFn: () => {
        const { mockCities } = require('../data/addPropertyMockData');
        return { data: mockCities };
      }
    })
  })
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notifications: notificationsSlice.reducer,
    payments: paymentsSlice.reducer,
    properties: propertiesSlice.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware)
});

export const { markAsRead, markAllAsRead } = notificationsSlice.actions;
export const { markPaymentAsPaid } = paymentsSlice.actions;
export const { 
  setViewMode, 
  setFilters, 
  setSelectedProperties, 
  togglePropertySelection, 
  selectAllProperties, 
  clearPropertySelection,
  openAddPropertyModal,
  closeAddPropertyModal,
  setAddPropertyLoading
} = propertiesSlice.actions;
export const { 
  useGetKPIDataQuery,
  useGetRevenueChartQuery,
  useGetActivitiesQuery,
  useGetRecentPaymentsQuery,
  useMarkPaymentAsPaidMutation,
  useGetPropertiesQuery,
  useArchivePropertiesMutation,
  useSendRemindersMutation,
  useExportPropertiesCSVMutation,
  useCreatePropertyMutation,
  useGetAvailableContactsQuery,
  useGetAvailableCitiesQuery
} = dashboardApi;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;