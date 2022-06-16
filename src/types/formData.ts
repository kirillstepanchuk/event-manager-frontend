export interface EmailData {
  email: string
}

export interface PasswordData {
  password: string,
  repeatedPassword: string,
  userId: number
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  repeatedNewPassword: string
}

export interface PhoneData {
  phone: string
}

interface TicketTypeData {
  count: number
  price: number
  title: string
}

export interface TicketsData {
  event_id: string
  user_id: string
  paymentMethod: string
  currency: string
  paymentData: TicketTypeData[]
  customerName: string
  customerEmail: string
  successRoute: string,
  cancelRoute: string,
}

export interface CategoriesData {
  categories: string[]
}
