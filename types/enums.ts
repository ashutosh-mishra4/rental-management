// Payment status enum
export enum PaymentStatus {
  PAID = 'paid',
  OVERDUE = 'overdue',
  PENDING = 'pending'
}

// Chart time period enum
export enum ChartPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly', 
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

// Activity types enum
export enum ActivityType {
  PAYMENT_RECEIVED = 'payment_received',
  TENANT_ADDED = 'tenant_added',
  PROPERTY_LISTED = 'property_listed',
  INVOICE_SENT = 'invoice_sent',
  MAINTENANCE_SCHEDULED = 'maintenance_scheduled'
}