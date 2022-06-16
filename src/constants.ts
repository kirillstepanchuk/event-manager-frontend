import { Position } from './types/events';

export const ROUTE_PAGES = {
  login: '/login',
  signup: '/signup',
  main: '/',
  profile: '/profile',
  eventsCategory: '/category',
  searchedEvents: '/search',
  checkEmail: '/check-email',
  registerStatus: '/register-status',
  resetPasswordEmail: '/reset-password/email',
  notifications: '/notifications',
  resetPassword: '/reset-password',
  map: '/map',
  editProfile: '/edit-profile',
  changePassword: '/change-password',
  event: '/event',
  createEvent: '/create-event',
  editEvent: '/edit-event',
  bookEvent: '/book-event',
  buyAdvertisement: '/buy-advertisement',
  buyAdvertisementStatus: '/advertisement-status',
  pendingEvents: '/pending-events',
  clients: '/clients',
  client: '/client',
  editClient: '/edit-client',
  bookEventState: '/book-status',
  importClients: '/import-clients',
  eventConversation: '/event-conversation',
};

export const EVENT_CATEGORIES = {
  concert: 'concert',
  standup: 'standup',
};

export const EVENT_CATEGORIES_IDS = {
  concert: '1',
  standup: '2',
};

export const TICKET_TYPES = {
  standart: 'standart',
  vip: 'vip',
};

export const PROFILE_EVENTS_TYPES = {
  organized: 'organized',
  booked: 'booked',
  history: 'history',
};

export const LANG_CODES = {
  en: 'EN',
  de: 'DE',
};

export const LANGS = {
  en: 'en',
  de: 'de',
};

export const TOKEN_ACTIONS = {
  reset: 'reset',
  register: 'register',
  login: 'login',
};

export const CURRENCIES = {
  euro: 'eur',
  usd: 'usd',
};

export const COOKIES = {
  user: 'user=',
  notifications: 'notifications=',
  token: 'token=',
  region: 'region=',
  paymentSessionId: 'payment_id=',
};

export const DEFAULT_CENTER: Position = {
  lat: 53.904541,
  lng: 27.561523,
};

export const UNDEFINED_ERROR = 'Something went wrong with server. Try again later';
export const PHONE_REG_EXP: RegExp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
export const NAME_REG_EXP: RegExp = /^[A-Za-z]+$/i;
