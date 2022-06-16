import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ResetPassword from '../ResetPassword';
import createMockStore, { InitialMockState } from '../../../mocks/store/mockStore';
import { mockAuthUserData } from '../../../mocks/store/constants';
import { ResetPasswordActionTypes } from '../../../store/actionTypes';

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
        <ResetPassword />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('should correct render', () => {
  it('with valid inputs', async () => {
    const store = setup();

    const passwordInput = screen.getByLabelText(/signup.login.resetPassword.input.password \*/i);
    const repeatedPasswordInput = screen.getByLabelText(/signup.resetPassword.input.repeatedPassword \*/i);
    const formButton = screen.getByRole('button', { name: 'resetPassword.button.confirm' });

    userEvent.type(passwordInput, mockAuthUserData.password.valid);
    userEvent.type(repeatedPasswordInput, mockAuthUserData.repeatedPassword.valid);

    userEvent.click(formButton);

    const actions = store.getActions();

    await waitFor(() => {
      expect(actions[0].type).toEqual(ResetPasswordActionTypes.RESET_PASSWORD);
    });
  });

  describe('with invalid inputs', () => {
    it('required inputs', async () => {
      setup();

      const formButton = screen.getByRole('button', { name: 'resetPassword.button.confirm' });

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('signup.login.resetPassword.input.passwordRequired')).toBeInTheDocument();
      });
    });

    describe('invalid password', () => {
      it('shorter than 6 symbols', async () => {
        setup();

        const passwordInput = screen.getByLabelText(/signup.login.resetPassword.input.password \*/i);
        const formButton = screen.getByRole('button', { name: 'resetPassword.button.confirm' });

        userEvent.type(passwordInput, mockAuthUserData.password.short);

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.login.resetPassword.input.passwordShort')).toBeInTheDocument();
        });
      });

      it('longer than 15 symbols', async () => {
        setup();

        const passwordInput = screen.getByLabelText(/signup.login.resetPassword.input.password \*/i);
        const formButton = screen.getByRole('button', { name: 'resetPassword.button.confirm' });

        userEvent.type(passwordInput, mockAuthUserData.password.long);

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.login.resetPassword.input.passwordLong')).toBeInTheDocument();
        });
      });
    });

    it('invalid repeated password', async () => {
      setup();

      const passwordInput = screen.getByLabelText(/signup.login.resetPassword.input.password \*/i);
      const repeatedPasswordInput = screen.getByLabelText(/signup.resetPassword.input.repeatedPassword \*/i);
      const formButton = screen.getByRole('button', { name: 'resetPassword.button.confirm' });

      userEvent.type(passwordInput, mockAuthUserData.password.valid);
      userEvent.type(repeatedPasswordInput, mockAuthUserData.repeatedPassword.invalid);

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('signup.resetPassword.input.repeatedPasswordRequired')).toBeInTheDocument();
      });
    });
  });
});
