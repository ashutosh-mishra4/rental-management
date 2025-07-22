import { PropertyStatus, PropertyTag, PropertyViewMode } from '../types/enums';

// Data returned by API queries
export const mockQuery = {
  properties: [
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main Street, New York, NY 10001",
      thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      units: {
        total: 24,
        occupied: 22,
        vacant: 2
      },
      monthlyRevenue: 28800,
      lastPaymentDate: new Date('2024-01-15'),
      manager: {
        id: 1,
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=5",
        initials: "SJ"
      },
      owner: {
        id: 2,
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/150?img=8",
        initials: "MC"
      },
      status: PropertyStatus.ACTIVE,
      city: "New York",
      tags: [PropertyTag.LUXURY, PropertyTag.PARKING, PropertyTag.GYM]
    },
    {
      id: 2,
      name: "Downtown Lofts",
      address: "456 Oak Avenue, Los Angeles, CA 90210",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      units: {
        total: 12,
        occupied: 8,
        vacant: 4
      },
      monthlyRevenue: 18000,
      lastPaymentDate: new Date('2024-01-12'),
      manager: {
        id: 3,
        name: "David Wilson",
        avatar: "https://i.pravatar.cc/150?img=3",
        initials: "DW"
      },
      owner: {
        id: 4,
        name: "Lisa Anderson",
        avatar: "https://i.pravatar.cc/150?img=9",
        initials: "LA"
      },
      status: PropertyStatus.ACTIVE,
      city: "Los Angeles",
      tags: [PropertyTag.PET_FRIENDLY, PropertyTag.FURNISHED]
    },
    {
      id: 3,
      name: "Garden View Complex",
      address: "789 Pine Street, Chicago, IL 60601",
      thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      units: {
        total: 36,
        occupied: 30,
        vacant: 6
      },
      monthlyRevenue: 43200,
      lastPaymentDate: new Date('2024-01-10'),
      manager: {
        id: 5,
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?img=2",
        initials: "ED"
      },
      owner: {
        id: 6,
        name: "Robert Kim",
        avatar: "https://i.pravatar.cc/150?img=10",
        initials: "RK"
      },
      status: PropertyStatus.ACTIVE,
      city: "Chicago",
      tags: [PropertyTag.POOL, PropertyTag.GYM, PropertyTag.PARKING]
    },
    {
      id: 4,
      name: "Riverside Towers",
      address: "321 River Road, Houston, TX 77001",
      thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      units: {
        total: 48,
        occupied: 0,
        vacant: 48
      },
      monthlyRevenue: 0,
      lastPaymentDate: null,
      manager: {
        id: 7,
        name: "James Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=11",
        initials: "JR"
      },
      owner: {
        id: 8,
        name: "Maria Garcia",
        avatar: "https://i.pravatar.cc/150?img=12",
        initials: "MG"
      },
      status: PropertyStatus.VACANT,
      city: "Houston",
      tags: [PropertyTag.LUXURY, PropertyTag.POOL]
    },
    {
      id: 5,
      name: "Heritage Manor",
      address: "654 Heritage Lane, Phoenix, AZ 85001",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      units: {
        total: 18,
        occupied: 15,
        vacant: 3
      },
      monthlyRevenue: 22500,
      lastPaymentDate: new Date('2024-01-08'),
      manager: {
        id: 9,
        name: "Anna Thompson",
        avatar: "https://i.pravatar.cc/150?img=13",
        initials: "AT"
      },
      owner: {
        id: 10,
        name: "Thomas Lee",
        avatar: "https://i.pravatar.cc/150?img=14",
        initials: "TL"
      },
      status: PropertyStatus.ARCHIVED,
      city: "Phoenix",
      tags: [PropertyTag.PET_FRIENDLY, PropertyTag.PARKING]
    },
    {
      id: 6,
      name: "Oceanview Residences",
      address: "987 Coastal Drive, Miami, FL 33101",
      thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      units: {
        total: 30,
        occupied: 28,
        vacant: 2
      },
      monthlyRevenue: 45000,
      lastPaymentDate: new Date('2024-01-14'),
      manager: {
        id: 11,
        name: "Carlos Martinez",
        avatar: "https://i.pravatar.cc/150?img=15",
        initials: "CM"
      },
      owner: {
        id: 12,
        name: "Jennifer White",
        avatar: "https://i.pravatar.cc/150?img=16",
        initials: "JW"
      },
      status: PropertyStatus.ACTIVE,
      city: "Miami",
      tags: [PropertyTag.LUXURY, PropertyTag.POOL, PropertyTag.GYM]
    }
  ]
};

// Data passed as props to the root component
export const mockRootProps = {
  initialViewMode: PropertyViewMode.TABLE,
  initialFilters: {
    search: '',
    status: 'all',
    city: 'all',
    unitCount: 'any',
    vacancy: 'any',
    priceRange: 'any',
    tags: []
  }
};