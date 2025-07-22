import { PropertyStatus, PropertyTag } from '../types/enums';

// Available managers and owners for selection
export const mockContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
    initials: "SJ",
    role: "Property Manager" as const
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=8",
    initials: "MC",
    role: "Property Owner" as const
  },
  {
    id: 3,
    name: "David Wilson",
    avatar: "https://i.pravatar.cc/150?img=3",
    initials: "DW",
    role: "Property Manager" as const
  },
  {
    id: 4,
    name: "Lisa Anderson",
    avatar: "https://i.pravatar.cc/150?img=9",
    initials: "LA",
    role: "Property Owner" as const
  },
  {
    id: 5,
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?img=2",
    initials: "ED",
    role: "Property Manager" as const
  },
  {
    id: 6,
    name: "Robert Kim",
    avatar: "https://i.pravatar.cc/150?img=10",
    initials: "RK",
    role: "Property Owner" as const
  },
  {
    id: 7,
    name: "James Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=11",
    initials: "JR",
    role: "Property Manager" as const
  },
  {
    id: 8,
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?img=12",
    initials: "MG",
    role: "Property Owner" as const
  }
];

// Available cities for property location
export const mockCities = [
  "New York",
  "Los Angeles", 
  "Chicago",
  "Houston",
  "Phoenix",
  "Miami",
  "San Francisco",
  "Boston",
  "Seattle",
  "Denver"
];

// Default form values for new property
export const defaultPropertyForm = {
  name: '',
  address: '',
  city: '',
  description: '',
  thumbnail: '',
  units: {
    total: 1,
    occupied: 0,
    vacant: 1
  },
  monthlyRevenue: 0,
  averageRent: 0,
  status: PropertyStatus.ACTIVE,
  managerId: null,
  ownerId: null,
  tags: [] as PropertyTag[]
};