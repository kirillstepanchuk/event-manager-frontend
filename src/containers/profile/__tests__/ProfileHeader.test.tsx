import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ProfileHeader from '../ProfileHeader';
import createMockStore, { InitialMockState } from '../../../mocks/store/mockStore';
import { mockError, mockUserData } from '../../../mocks/store/constants';

const theme = createTheme();

const setup = (initialState: InitialMockState) => {
  const store = createMockStore(initialState);

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ProfileHeader open={jest.fn()} />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('category of events page', () => {
  it('should correct render events', () => {
    const initialState = {
      user: {
        data: mockUserData,
        error: '',
        loading: false,
        userCookie: '',
      },
    };

    setup(initialState);

    const userDescription = screen.getByText(mockUserData.description);
    const userName = screen.getByText(`${mockUserData.firstName} ${mockUserData.lastName}`);
    const userEmail = screen.getByText(mockUserData.email);

    expect(userDescription).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
  });

  it('should render error', () => {
    const initialState = {
      user: {
        data: null,
        error: mockError,
        loading: false,
        userCookie: '',
      },
    };

    setup(initialState);

    const error = screen.getByText(mockError);
    expect(error).toBeInTheDocument();
  });
});
