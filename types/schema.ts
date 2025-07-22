import { PaymentStatus, ChartPeriod, ActivityType } from './enums';

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