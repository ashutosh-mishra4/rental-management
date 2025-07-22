import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockStore, mockQuery } from '../data/dashboardMockData';
import { ChartPeriod, PaymentStatus } from '../types/enums';
import type { KPIData, RevenueDataPoint, Activity, Payment } from '../types/schema';

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

// API slice for data fetching
export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Payments'],
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
    })
  })
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notifications: notificationsSlice.reducer,
    payments: paymentsSlice.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware)
});

export const { markAsRead, markAllAsRead } = notificationsSlice.actions;
export const { markPaymentAsPaid } = paymentsSlice.actions;
export const { 
  useGetKPIDataQuery,
  useGetRevenueChartQuery,
  useGetActivitiesQuery,
  useGetRecentPaymentsQuery,
  useMarkPaymentAsPaidMutation
} = dashboardApi;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;