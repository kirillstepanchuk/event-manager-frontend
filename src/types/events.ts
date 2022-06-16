export interface Event extends Position {
  id: number,
  title: string,
  description: string,
  eventDate: Date
  eventTime: Date
  eventEndDate: Date
  category: string
  preview: string
  isApproved: boolean,
  address: string
  timeZone: number,
  price: number,
  vipPrice: number,
  organizerId: number,
  contactPerson: string,
  contactOption: string,
  currency: string,
}

export interface NewEventData {
  title: string
  price: number
  vipPrice: number
  startDate: Date
  endDate: Date
  description: string
  address: string
  category: string
  preview: string
  longtitude: number
  latitude: number
  contactPerson: string
  contactOption: string
  currency: string
}

export interface Location {
  longtitude: number
  latitude: number
}

export interface EventCategory {
  category: string
  eventCards: Event[]
}

export interface EventCategoryData {
  category: string,
  page: number,
}

export interface EventCategorySuccessData {
  events: Event[],
  pageCount: number,
}

export interface EventSearchData {
  title: string,
  page: number,
}

export interface EventSearchSuccessData {
  events: Event[],
  pageCount: number,
}

export interface EventsType {
  type: string
  events: Event[]
}

export interface MapEvent {
  id: number,
  title: string,
  address: string,
  lng: number,
  lat: number,
}

export interface Position {
  lng: number,
  lat: number,
}

export interface PaymentSessionData {
  url: string
  session_id: string
}

export interface AdvertisementData {
  startDatetime: Date
  endDatetime: Date
  eventCategory: string
  eventId: string
  frequency: number
  timeZone: number
  paymentData: {
    method: string,
    price: number,
    currency: string
    successRoute: string
    cancelRoute: string
    title: string
  }
}
