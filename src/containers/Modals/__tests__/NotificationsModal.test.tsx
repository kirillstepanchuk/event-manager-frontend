import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import NotificationsModal from '../NotificationsModal';
import createMockStore, { InitialMockState } from '../../../mocks/store/mockStore';
import { mockAuthUserData } from '../../../mocks/store/constants';
import { SubscribeToNotificationsActionTypes } from '../../../store/actionTypes';

const theme = createTheme();

const setup = () => {
  const initialState: InitialMockState = {
    user: {
      data: null,
      error: '',
      loading: false,
      userCookie: '',
    },
    api: {
      data: null,
      error: null,
      loading: false,
    },
  };

  const store = createMockStore(initialState);

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NotificationsModal close={jest.fn()} />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('should correct render', () => {
  it('with valid inputs', async () => {
    const store = setup();

    const phoneInput = screen.getByRole('textbox', { name: 'notificationsModal.input.phone' });
    const formButton = screen.getByRole('button', { name: 'notificationsModal.button.yes' });

    userEvent.type(phoneInput, mockAuthUserData.phone.valid);

    userEvent.click(formButton);

    const actions = store.getActions();

    await waitFor(() => {
      expect(actions[0].type).toEqual(
        SubscribeToNotificationsActionTypes.SUBSCRIBE_TO_NOTIFICATIONS,
      );
    });
  });

  describe('with invalid inputs', () => {
    it('required inputs', async () => {
      setup();

      const formButton = screen.getByRole('button', { name: 'notificationsModal.button.yes' });

      userEvent.click(formButton);

      await waitFor(() => {
        expect(screen.getByText('notificationsModal.input.phoneRequired')).toBeInTheDocument();
      });
    });

    it('invalid email', async () => {
      setup();

      const phoneInput = screen.getByRole('textbox', { name: 'notificationsModal.input.phone' });
      const formButton = screen.getByRole('button', { name: 'notificationsModal.button.yes' });

      userEvent.type(phoneInput, mockAuthUserData.phone.invalid);

      userEvent.click(formButton);

      await waitFor(() => {
        expect(screen.getByText('notificationsModal.input.phoneInvalid')).toBeInTheDocument();
      });
    });
  });
});
