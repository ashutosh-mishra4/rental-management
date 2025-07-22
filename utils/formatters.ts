import { PaymentStatus, ChartPeriod, ActivityType, PropertyStatus, PropertyTag, UnitCountFilter, VacancyFilter, PriceRangeFilter } from '../types/enums';

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

export const formatPropertyStatus = (status: PropertyStatus): string => {
  switch (status) {
    case PropertyStatus.ACTIVE:
      return 'Active';
    case PropertyStatus.VACANT:
      return 'Vacant';
    case PropertyStatus.ARCHIVED:
      return 'Archived';
    default:
      return 'Unknown';
  }
};

export const formatPropertyTag = (tag: PropertyTag): string => {
  switch (tag) {
    case PropertyTag.LUXURY:
      return 'Luxury';
    case PropertyTag.PET_FRIENDLY:
      return 'Pet-Friendly';
    case PropertyTag.FURNISHED:
      return 'Furnished';
    case PropertyTag.PARKING:
      return 'Parking';
    case PropertyTag.GYM:
      return 'Gym';
    case PropertyTag.POOL:
      return 'Pool';
    default:
      return tag;
  }
};

export const formatUnitCount = (total: number, occupied: number): string => {
  const vacant = total - occupied;
  return `${total} total • ${occupied} occupied • ${vacant} vacant`;
};

export const formatVacancyRate = (total: number, occupied: number): string => {
  const vacancyRate = ((total - occupied) / total) * 100;
  return `${vacancyRate.toFixed(0)}% vacant`;
};

export const formatUnitCountFilter = (filter: UnitCountFilter): string => {
  switch (filter) {
    case UnitCountFilter.ANY:
      return 'Any Units';
    case UnitCountFilter.SMALL:
      return '1-5 units';
    case UnitCountFilter.MEDIUM:
      return '6-20 units';
    case UnitCountFilter.LARGE:
      return '21+ units';
    default:
      return 'Any Units';
  }
};

export const formatVacancyFilter = (filter: VacancyFilter): string => {
  switch (filter) {
    case VacancyFilter.ANY:
      return 'Any Vacancy';
    case VacancyFilter.AVAILABLE:
      return 'Available';
    case VacancyFilter.FULLY_OCCUPIED:
      return 'Fully Occupied';
    case VacancyFilter.PARTIALLY_VACANT:
      return 'Partially Vacant';
    default:
      return 'Any Vacancy';
  }
};

export const formatPriceRangeFilter = (filter: PriceRangeFilter): string => {
  switch (filter) {
    case PriceRangeFilter.ANY:
      return 'Any Price';
    case PriceRangeFilter.LOW:
      return '$0 - $1,000';
    case PriceRangeFilter.MEDIUM:
      return '$1,000 - $2,500';
    case PriceRangeFilter.HIGH:
      return '$2,500 - $5,000';
    case PriceRangeFilter.PREMIUM:
      return '$5,000+';
    default:
      return 'Any Price';
  }
};

export const formatImageUploadError = (error: string): string => {
  switch (error) {
    case 'file_too_large':
      return 'File size exceeds 5MB limit';
    case 'invalid_format':
      return 'Please upload JPG, PNG, or WebP format';
    case 'upload_failed':
      return 'Upload failed. Please try again';
    default:
      return 'An error occurred during upload';
  }
};

export const formatUnitValidation = (total: number, occupied: number): string => {
  if (occupied > total) {
    return 'Occupied units cannot exceed total units';
  }
  if (total <= 0) {
    return 'Total units must be greater than 0';
  }
  if (occupied < 0) {
    return 'Occupied units cannot be negative';
  }
  return '';
};

export const formatCurrencyInput = (value: string): string => {
  // Remove non-numeric characters except decimal point
  const numericValue = value.replace(/[^0-9.]/g, '');
  // Format as currency without symbol for input
  return numericValue;
};