import { PaymentStatus, ChartPeriod, ActivityType, PropertyStatus, PropertyViewMode, PropertyTag } from './enums';

// Props types (data passed to components)
export interface DashboardProps {
  selectedPeriod: ChartPeriod;
  currentMonth: number;
}

export interface KPIMetric {
  value: number;
  delta: number;
  isPositive: boolean;
}

export interface KPIData {
  totalRevenue: KPIMetric;
  totalInvoices: KPIMetric;
  totalTenants: KPIMetric;
  onTimePaymentRate: KPIMetric;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Activity {
  id: number;
  type: ActivityType;
  description: string;
  amount?: number;
  timestamp: Date;
  user: {
    name: string;
    avatar: string | null;
  };
}

export interface Tenant {
  name: string;
  avatar: string;
  initials: string;
}

export interface Payment {
  id: number;
  invoiceId: string;
  dueDate: Date;
  tenant: Tenant;
  amount: number;
  status: PaymentStatus;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Store types (global state data)
export interface StoreTypes {
  user: User;
  notifications: {
    unreadCount: number;
    items: Notification[];
  };
}

// Query types (API response data)
export interface QueryTypes {
  kpiData: KPIData;
  revenueChartData: RevenueDataPoint[];
  activities: Activity[];
  recentPayments: Payment[];
}

// Properties-related types
export interface PropertyFilters {
  search: string;
  status: string;
  city: string;
  unitCount: string;
  vacancy: string;
  priceRange: string;
  tags: PropertyTag[];
}

export interface Property {
  id: number;
  name: string;
  address: string;
  thumbnail: string;
  units: {
    total: number;
    occupied: number;
    vacant: number;
  };
  monthlyRevenue: number;
  lastPaymentDate: Date | null;
  manager: PropertyContact;
  owner: PropertyContact;
  status: PropertyStatus;
  city: string;
  tags: PropertyTag[];
}

export interface PropertyContact {
  id: number;
  name: string;
  avatar: string;
  initials: string;
}

export interface PropertiesPageProps {
  initialViewMode: PropertyViewMode;
  initialFilters: PropertyFilters;
}

// Query types for properties
export interface PropertiesQueryTypes {
  properties: Property[];
}

// Add Property Modal types
export interface PropertyFormData {
  name: string;
  address: string;
  city: string;
  description: string;
  thumbnail: string;
  units: {
    total: number;
    occupied: number;
    vacant: number;
  };
  monthlyRevenue: number;
  averageRent: number;
  status: PropertyStatus;
  managerId: number | null;
  ownerId: number | null;
  tags: PropertyTag[];
}

export interface ContactOption {
  id: number;
  name: string;
  avatar: string;
  initials: string;
  role: 'Property Manager' | 'Property Owner';
}

export interface FormValidationErrors {
  name?: string;
  address?: string;
  city?: string;
  totalUnits?: string;
  occupiedUnits?: string;
  monthlyRevenue?: string;
  managerId?: string;
  ownerId?: string;
  thumbnail?: string;
}

export interface AddPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (propertyData: PropertyFormData) => Promise<void>;
  loading?: boolean;
}