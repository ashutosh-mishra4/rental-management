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

// Property status enum
export enum PropertyStatus {
  ACTIVE = 'active',
  VACANT = 'vacant', 
  ARCHIVED = 'archived'
}

// Property view mode enum
export enum PropertyViewMode {
  TABLE = 'table',
  GRID = 'grid'
}

// Unit count filter enum
export enum UnitCountFilter {
  ANY = 'any',
  SMALL = '1-5',
  MEDIUM = '6-20', 
  LARGE = '21+'
}

// Vacancy filter enum  
export enum VacancyFilter {
  ANY = 'any',
  AVAILABLE = 'available',
  FULLY_OCCUPIED = 'fully_occupied',
  PARTIALLY_VACANT = 'partially_vacant'
}

// Price range filter enum
export enum PriceRangeFilter {
  ANY = 'any',
  LOW = '0-1000',
  MEDIUM = '1000-2500',
  HIGH = '2500-5000',
  PREMIUM = '5000+'
}

// Property tags enum
export enum PropertyTag {
  LUXURY = 'luxury',
  PET_FRIENDLY = 'pet_friendly',
  FURNISHED = 'furnished', 
  PARKING = 'parking',
  GYM = 'gym',
  POOL = 'pool'
}

// Form validation states
export enum FormValidationState {
  VALID = 'valid',
  INVALID = 'invalid',
  PENDING = 'pending'
}

// Image upload states
export enum ImageUploadState {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  ERROR = 'error'
}