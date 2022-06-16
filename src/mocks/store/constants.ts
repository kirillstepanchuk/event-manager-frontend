import { ROUTE_PAGES } from '../../constants';

export const mockEventsCategory = 'category';
export const mockEventsType = 'organized';
export const mockEventsSearchTitle = 'title';
export const mockEventId = '1';
export const mockUserId = 1232313;
export const mockEventCode = 'code';
export const mockPage = 1;
export const mockCurrentUser = 1232313;

export const mockSuccess = 'success';
export const mockError = 'someError';
export const mockToken = '123';

export const mockAuthUserData = {
  email: {
    valid: 'mockemail@mail.ru',
    invalid: 'mockemail@',
  },
  firstName: {
    valid: 'Maxim',
    short: 'M',
    withNumbers: 'lm123',
  },
  lastName: {
    valid: 'Abelchuk',
    short: 'A',
    withNumbers: 'lm123',
  },
  password: {
    valid: 'SomePassword',
    short: '12345',
    long: '123123123123123123123',
  },
  repeatedPassword: {
    valid: 'SomePassword',
    invalid: 'SomePasswor',
  },
  phone: {
    valid: '+375333333333',
    invalid: '+333',
  },
};

export const mockLoginUser = {
  email: 'dadada@mail.ru',
  password: 'adfadad',
};

export const mockRegisterUser = {
  email: 'dadada@mail.ru',
  firstName: 'firstName',
  lastName: 'lastName',
  password: 'password',
};

export const mockUserData = {
  userId: 21123,
  email: 'dadada@mail.ru',
  firstName: 'firstName',
  lastName: 'lastName',
  description: 'cool man',
  avatar: 'avatar.jpg',
  phoneNumber: '+3752121122',
  role: 'customer',
  token: '123',
};

export const mockUserEditData = {
  firstName: 'firstName',
  lastName: 'lastName',
  description: 'cool man',
};

export const mockEvent = {
  id: 1,
  title: 'title',
  description: 'description',
  category: 'category',
  address: 'some address',
  lat: 1,
  lng: 1,
  eventTime: new Date(Date.now()),
  eventDate: new Date(Date.now()),
  eventEndDate: new Date(Date.now()),
  preview: 'preview',
  timeZone: 0,
  isApproved: false,
  price: 20,
  vipPrice: 30,
  organizerId: 1,
  contactPerson: 'person',
  contactOption: 'test@gmail.com',
  currency: 'euro',
};

export const mockAxiosEvent = {
  ...mockEvent,
  eventTime: mockEvent.eventTime.toISOString(),
  eventEndDate: mockEvent.eventEndDate.toISOString(),
  eventDate: mockEvent.eventDate.toISOString(),
};

export const mockNewEvent = {
  title: 'title',
  price: 20,
  vipPrice: 30,
  startDate: new Date(Date.now()),
  endDate: new Date(Date.now()),
  description: 'description',
  address: 'address',
  category: 'category',
  preview: 'preview',
  longtitude: 1,
  latitude: 1,
  contactPerson: 'person',
  contactOption: 'test@gmail.com',
  currency: 'euro',
};

export const mockEditEvent = {
  data: mockNewEvent,
  id: mockEventId,
};

export const mockEventsCategoriesData = [{
  category: 'category',
  eventCards: [mockEvent],
}];

export const mockAxiosEventsCategoriesData = [{
  category: 'category',
  eventCards: [mockAxiosEvent],
}];

export const mockEventsData = [mockEvent];
export const mockAxiosEventsData = [mockAxiosEvent];

export const mockCategorizedEventsData = {
  events: mockEventsData,
  pageCount: mockPage,
};

export const mockSearchedEventsData = {
  events: mockEventsData,
  pageCount: mockPage,
};

export const mockEventsTypeData = {
  type: 'organized',
  events: mockEventsData,
};

export const mockAxiosResponse = {
  data: {
    message: 'message',
  },
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

export const mockMapData = {
  radius: 1,
  position: {
    lng: 1,
    lat: 1,
  },
};

export const mockCategoriesData = {
  categories: ['category'],
  agreement: 'agreed',
};

export const mockTicketsData = {
  user_id: '11',
  event_id: '51',
  paymentMethod: 'card',
  currency: 'eur',
  customerName: 'name',
  customerEmail: 'email@mail.ru',
  successRoute: '/',
  cancelRoute: '/',
  paymentData: [
    {
      title: 'standart',
      count: 2,
      price: 20,
    },
    {
      title: 'vip',
      count: 3,
      price: 30,
    },
  ],
};

export const mockAdvertisementData = {
  startDatetime: new Date(),
  endDatetime: new Date(),
  eventCategory: 'category',
  eventId: mockEventId,
  frequency: 25,
  timeZone: 3,
  paymentData: {
    title: 'title',
    currency: 'eur',
    method: 'card',
    price: 20,
    successRoute: '/',
    cancelRoute: '/',
  },
};

export const mockLocationChangePayload = {
  location: {
    pathname: '/',
    search: '',
    hash: '',
    query: {},
    state: {},
  },
  isFirstRendering: false,
};

export const mockEventLocationChangePayload = {
  location: {
    pathname: ROUTE_PAGES.bookEvent,
    search: '',
    hash: '',
    query: {},
    state: {},
  },
  isFirstRendering: false,
};

export const mockEventsCategoryPayload = {
  category: mockEventsCategory,
  page: mockPage,
};

export const mockEventsSearchPayload = {
  title: mockEventsCategory,
  page: mockPage,
};

export const mockAxiosSuccessMessage = {
  message: mockSuccess,
};

export const mockCreatePaymentSessionSuccess = {
  url: 'url',
  session_id: 'id',
};

export const mockResetPassword = {
  password: mockAuthUserData.password.valid,
  repeatedPassword: mockAuthUserData.repeatedPassword.valid,
  userId: mockUserId,
};

export const mockAxiosPaymentSessionMessage = {
  url: 'url',
};

export const mockChangePasswordData = {
  currentPassword: mockAuthUserData.password.valid,
  newPassword: '123123',
  repeatedNewPassword: '123123',
  userId: mockUserId,
};

export const mockPaymentSessionData = {
  session_id: 'id',
  url: 'id',
};

export const mockUserCategories = [
  {
    category_name: 'category',
  },
];
