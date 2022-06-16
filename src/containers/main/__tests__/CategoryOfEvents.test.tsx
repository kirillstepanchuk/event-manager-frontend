import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import CategoryOfEvents from '../CategoryOfEvents';
import createMockStore, { InitialMockState } from '../../../mocks/store/mockStore';
import { mockError, mockCategorizedEventsData } from '../../../mocks/store/constants';

const theme = createTheme();

const setup = (initialState: InitialMockState) => {
  const store = createMockStore(initialState);

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CategoryOfEvents />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('category of events page', () => {
  it('should correct render events', () => {
    const initialState = {
      eventsCategory: {
        data: mockCategorizedEventsData,
        error: '',
        loading: false,
      },
    };

    setup(initialState);

    const events = screen.getAllByText(mockCategorizedEventsData.events[0].title);
    expect(events[0]).toBeInTheDocument();
  });

  it('should render error', () => {
    const initialState = {
      eventsCategory: {
        data: null,
        error: mockError,
        loading: false,
      },
    };

    setup(initialState);

    const error = screen.getByText(initialState.eventsCategory.error);
    expect(error).toBeInTheDocument();
  });
});
