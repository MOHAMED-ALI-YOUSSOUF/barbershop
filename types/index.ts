export interface Organization {
  _id: string
  name: string
  slug: { current: string }
  ownerId: string
  phone?: string
  email?: string
  address?: string
  city: string
  logo?: any
  description?: string
  currency: string
  businessHours: BusinessHour[]
  paymentMethods: PaymentMethod[]
  homeServiceEnabled: boolean
  homeServiceZones?: Zone[]
  homeServiceMinimum?: number
  isActive: boolean
  createdAt: string
}

export interface BusinessHour {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  isOpen: boolean
  openTime: string
  closeTime: string
}

export interface Zone {
  name: string
  surcharge: number
}

export type PaymentMethod = 'cash' | 'd-money' | 'waafi'

export interface Barber {
  _id: string
  name: string
  organization: { _ref: string }
  email?: string
  phone?: string
  photo?: any
  bio?: string
  specialties?: string[]
  workingHours: WorkingHour[]
  homeServiceEnabled: boolean
  homeServiceNote?: string
  isActive: boolean
  createdAt: string
}

export interface WorkingHour {
  day: string
  isWorking: boolean
  startTime: string
  endTime: string
}

export interface Service {
  _id: string
  name: string
  organization: { _ref: string }
  description?: string
  price: number
  duration: number
  image?: any
  category?: string
  availableAtHome: boolean
  homeServiceSurcharge?: number
  isActive: boolean
  createdAt: string
}

export interface Booking {
  _id: string
  organization: { _ref: string }
  barber: { _ref: string }
  service: { _ref: string }
  serviceName: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  date: string
  duration: number
  serviceType: 'salon' | 'home'
  homeAddress?: HomeAddress
  price: number
  homeServiceFee?: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  paymentMethod: PaymentMethod | 'not-specified'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  transactionId?: string
  notes?: string
  adminNotes?: string
  cancellationToken: string
  createdAt: string
  updatedAt?: string
}

export interface HomeAddress {
  street: string
  zone: string
  city: string
  instructions?: string
}

export interface Customer {
  _id: string
  name: string
  phone: string
  email?: string
  organization: { _ref: string }
  totalBookings: number
  lastVisit?: string
  notes?: string
  createdAt: string
}

export interface TimeSlot {
  time: string
  available: boolean
}