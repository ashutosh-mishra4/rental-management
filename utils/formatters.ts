import { PaymentStatus, ChartPeriod, ActivityType } from '../types/enums';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

export const formatPaymentStatus = (status: PaymentStatus): string => {
  switch (status) {
    case PaymentStatus.PAID:
      return 'Paid';
    case PaymentStatus.OVERDUE:
      return 'Overdue';
    case PaymentStatus.PENDING:
      return 'Pending';
    default:
      return 'Unknown';
  }
};

export const formatChartPeriod = (period: ChartPeriod): string => {
  switch (period) {
    case ChartPeriod.DAILY:
      return 'Daily';
    case ChartPeriod.WEEKLY:
      return 'Weekly';
    case ChartPeriod.MONTHLY:
      return 'Monthly';
    case ChartPeriod.YEARLY:
      return 'Yearly';
    default:
      return 'Monthly';
  }
};

export const formatActivityType = (type: ActivityType): string => {
  switch (type) {
    case ActivityType.PAYMENT_RECEIVED:
      return 'Payment Received';
    case ActivityType.TENANT_ADDED:
      return 'New Tenant Added';
    case ActivityType.PROPERTY_LISTED:
      return 'Property Listed';
    case ActivityType.INVOICE_SENT:
      return 'Invoice Sent';
    case ActivityType.MAINTENANCE_SCHEDULED:
      return 'Maintenance Scheduled';
    default:
      return 'Activity';
  }
};