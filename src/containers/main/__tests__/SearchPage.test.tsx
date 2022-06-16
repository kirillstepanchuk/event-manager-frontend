import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import SearchPage from '../SearchPage';
import createMockStore, { InitialMockState } from '../../../mocks/store/mockStore';
import {
  mockEventsData, mockError, mockUserData, mockSearchedEventsData,
} from '../../../mocks/store/constants';

const theme = createTheme();

const setup = (initialState: InitialMockState) => {
  const store = createMockStore(initialState);

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SearchPage />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('searched events', () => {
  it('should correct render events', () => {
    const initialState = {
      searchedEvents: {
        data: mockSearchedEventsData,
        error: '',
        loading: false,
      },
      user: {
        data: mockUserData,
        error: '',
        loading: false,
        userCookie: '',
      },
    };

    setup(initialState);

    const events = screen.getAllByText(mockEventsData[0].title);
    expect(events[0]).toBeInTheDocument();
  });

  it('should render error', () => {
    const initialState = {
      searchedEvents: {
        data: null,
        error: mockError,
        loading: false,
      },
      user: {
        data: mockUserData,
        error: '',
        loading: false,
        userCookie: '',
      },
    };

    setup(initialState);

    const error = screen.getByText(initialState.searchedEvents.error);
    expect(error).toBeInTheDocument();
  });
});
