import { PaymentStatus, ChartPeriod, ActivityType } from '../types/enums';

// Data for global state store
export const mockStore = {
  user: {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@realestatepro.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Property Manager" as const
  },
  notifications: {
    unreadCount: 3,
    items: [
      {
        id: 1,
        title: "New payment received",
        message: "Payment of $1,200 received from John Doe",
        timestamp: new Date('2024-01-15T10:30:00'),
        read: false
      },
      {
        id: 2, 
        title: "Maintenance request",
        message: "Tenant reported plumbing issue in Unit 4B",
        timestamp: new Date('2024-01-15T09:15:00'),
        read: false
      }
    ]
  }
};

// Data returned by API queries
export const mockQuery = {
  kpiData: {
    totalRevenue: {
      value: 125000,
      delta: 12.5,
      isPositive: true
    },
    totalInvoices: {
      value: 48,
      delta: -2.1,
      isPositive: false
    },
    totalTenants: {
      value: 156,
      delta: 8.3,
      isPositive: true
    },
    onTimePaymentRate: {
      value: 94.2,
      delta: 1.8,
      isPositive: true
    }
  },
  revenueChartData: [
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
  ],
  activities: [
    {
      id: 1,
      type: ActivityType.PAYMENT_RECEIVED,
      description: "Payment received from John Smith",
      amount: 1200,
      timestamp: new Date('2024-01-15T14:30:00'),
      user: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=1"
      }
    },
    {
      id: 2,
      type: ActivityType.TENANT_ADDED,
      description: "New tenant added to Unit 3A",
      timestamp: new Date('2024-01-15T11:45:00'),
      user: {
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?img=2"
      }
    },
    {
      id: 3,
      type: ActivityType.INVOICE_SENT,
      description: "Monthly invoice sent to all tenants",
      timestamp: new Date('2024-01-15T09:00:00'),
      user: {
        name: "System",
        avatar: null
      }
    },
    {
      id: 4,
      type: ActivityType.MAINTENANCE_SCHEDULED,
      description: "HVAC maintenance scheduled for Building A",
      timestamp: new Date('2024-01-14T16:20:00'),
      user: {
        name: "Mike Wilson",
        avatar: "https://i.pravatar.cc/150?img=3"
      }
    }
  ],
  recentPayments: [
    {
      id: 1,
      invoiceId: "INV-2024-001",
      dueDate: new Date('2024-01-20'),
      tenant: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=1",
        initials: "JS"
      },
      amount: 1200,
      status: PaymentStatus.PAID
    },
    {
      id: 2,
      invoiceId: "INV-2024-002", 
      dueDate: new Date('2024-01-18'),
      tenant: {
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?img=2",
        initials: "ED"
      },
      amount: 950,
      status: PaymentStatus.OVERDUE
    },
    {
      id: 3,
      invoiceId: "INV-2024-003",
      dueDate: new Date('2024-01-25'),
      tenant: {
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?img=4",
        initials: "MB"
      },
      amount: 1350,
      status: PaymentStatus.PAID
    },
    {
      id: 4,
      invoiceId: "INV-2024-004",
      dueDate: new Date('2024-01-22'),
      tenant: {
        name: "Sarah Wilson",
        avatar: "https://i.pravatar.cc/150?img=6",
        initials: "SW"
      },
      amount: 1100,
      status: PaymentStatus.PENDING
    },
    {
      id: 5,
      invoiceId: "INV-2024-005",
      dueDate: new Date('2024-01-15'),
      tenant: {
        name: "David Lee",
        avatar: "https://i.pravatar.cc/150?img=7",
        initials: "DL"
      },
      amount: 1450,
      status: PaymentStatus.OVERDUE
    }
  ]
};

// Data passed as props to the root component
export const mockRootProps = {
  selectedPeriod: ChartPeriod.MONTHLY,
  currentMonth: 11 // December (0-indexed)
};