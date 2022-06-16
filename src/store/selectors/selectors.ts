import { RootState } from '../reducers/root';

export const selectEventsState = (state: RootState) => state.events;
export const selectApiState = (state: RootState) => state.api;
export const selectUserState = (state: RootState) => state.user;
export const selectSearchedEventsState = (state: RootState) => state.searchedEvents;
export const selectEventsCategoryState = (state: RootState) => state.eventsCategory;
export const selectMapEventState = (state: RootState) => state.mapEvents;
export const selectUserLocationState = (state: RootState) => state.userLocation;
export const selectEventState = (state: RootState) => state.event;
export const selectCalendarEventState = (state: RootState) => state.calendarEvent;
export const selectUserCategories = (state: RootState) => state.userCategories;
export const selectUnnaprovedEvents = (state: RootState) => state.unapprovedEvents;
export const selectProfileEventsState = (state: RootState) => state.profileEvents;
export const selectClientState = (state: RootState) => state.client;
export const selectClientsState = (state: RootState) => state.clients;
export const selectClientEventsState = (state: RootState) => state.clientEvents;
