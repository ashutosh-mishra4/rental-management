import { ChartPeriod } from '../types/enums';
import type { RevenueDataPoint } from '../types/schema';

export const generateChartData = (period: ChartPeriod): RevenueDataPoint[] => {
  switch (period) {
    case ChartPeriod.DAILY:
      return [
        { month: 'Mon', revenue: 1200 },
        { month: 'Tue', revenue: 1800 },
        { month: 'Wed', revenue: 1500 },
        { month: 'Thu', revenue: 2100 },
        { month: 'Fri', revenue: 2400 },
        { month: 'Sat', revenue: 1900 },
        { month: 'Sun', revenue: 1600 }
      ];
    
    case ChartPeriod.WEEKLY:
      return [
        { month: 'Week 1', revenue: 8500 },
        { month: 'Week 2', revenue: 9200 },
        { month: 'Week 3', revenue: 7800 },
        { month: 'Week 4', revenue: 10100 },
        { month: 'Week 5', revenue: 9600 },
        { month: 'Week 6', revenue: 11200 }
      ];
    
    case ChartPeriod.MONTHLY:
      return [
        { month: "Jan", revenue: 18500 },
        { month: "Feb", revenue: 22300 },
        { month: "Mar", revenue: 19800 },
        { month: "Apr", revenue: 25100 },
        { month: "May", revenue: 23400 },
        { month: "Jun", revenue: 27600 },
        { month: "Jul", revenue: 29200 },
        { month: "Aug", revenue: 31800 },
        { month: "Sep", revenue: 28900 },
        { month: "Oct", revenue: 33400 },
        { month: "Nov", revenue: 35700 },
        { month: "Dec", revenue: 38200 }
      ];
    
    case ChartPeriod.YEARLY:
      return [
        { month: '2019', revenue: 245000 },
        { month: '2020', revenue: 198000 },
        { month: '2021', revenue: 287000 },
        { month: '2022', revenue: 312000 },
        { month: '2023', revenue: 356000 },
        { month: '2024', revenue: 389000 }
      ];
    
    default:
      return [];
  }
};