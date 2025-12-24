import { groq } from 'next-sanity'

// Récupérer un barbershop par slug
export const getOrganizationBySlugQuery = groq`
  *[_type == "organization" && slug.current == $slug && isActive == true][0] {
    _id,
    name,
    slug,
    phone,
    email,
    address,
    city,
    logo,
    description,
    businessHours,
    paymentMethods,
    homeServiceEnabled,
    homeServiceZones,
    homeServiceMinimum,
    isActive
  }
`

// Récupérer les barbiers d'un barbershop
export const getBarbersByOrganizationQuery = groq`
  *[_type == "barber" && organization._ref == $organizationId && isActive == true] {
    _id,
    name,
    organization,
    email,
    phone,
    photo,
    bio,
    specialties,
    workingHours,
    homeServiceEnabled,
    homeServiceNote,
    isActive,
    createdAt
  }
`

// Récupérer les services d'un barbershop
export const getServicesByOrganizationQuery = groq`
  *[_type == "service" && organization._ref == $organizationId && isActive == true] {
    _id,
    name,
    description,
    price,
    duration,
    image,
    category,
    availableAtHome,
    homeServiceSurcharge,
    isActive
  }
`

// Récupérer les réservations d'un barbier pour une date
export const getBookingsByBarberAndDateQuery = groq`
  *[_type == "booking" 
    && barber._ref == $barberId 
    && dateTime(date) >= dateTime($startDate)
    && dateTime(date) < dateTime($endDate)
    && status in ["pending", "confirmed"]
  ] {
    _id,
    date,
    duration,
    status
  }
`

// Récupérer une réservation par token
export const getBookingByTokenQuery = groq`
  *[_type == "booking" && cancellationToken == $token][0] {
    _id,
    organization->{
      _id,
      name,
      address,
      phone
    },
    barber->{
      _id,
      name,
      phone
    },
    service->{
      _id,
      name,
      price,
      duration
    },
    customerName,
    customerPhone,
    customerEmail,
    date,
    serviceType,
    homeAddress,
    price,
    homeServiceFee,
    totalPrice,
    status,
    paymentMethod,
    paymentStatus,
    notes,
    createdAt
  }
`