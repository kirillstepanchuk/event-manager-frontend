import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import createMockStore, { InitialMockState } from '../../../mocks/store/mockStore';
import { mockEventsCategoriesData, mockEventsData, mockError } from '../../../mocks/store/constants';
import EventsCategories from '../EventsCategories';

const theme = createTheme();

const setup = (initialState: InitialMockState) => {
  const store = createMockStore(initialState);

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <EventsCategories />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('events categories', () => {
  it('should correct render events', () => {
    const initialState = {
      events: {
        data: mockEventsCategoriesData,
        error: '',
        loading: false,
      },
    };

    setup(initialState);

    const events = screen.getAllByText(mockEventsData[0].title);
    expect(events[0]).toBeInTheDocument();
  });

  it('should render error', () => {
    const initialState = {
      events: {
        data: null,
        error: mockError,
        loading: false,
      },
    };

    setup(initialState);

    const error = screen.getByText(initialState.events.error);
    expect(error).toBeInTheDocument();
  });
});
