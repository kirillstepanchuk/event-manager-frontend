import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import SignUp from '../SignUp';
import createMockStore, { InitialMockState } from '../../../mocks/store/mockStore';
import { mockAuthUserData } from '../../../mocks/store/constants';
import { RegisterActionTypes } from '../../../store/actionTypes';

const theme = createTheme();

const setup = () => {
  const initialState: InitialMockState = {
    user: {
      data: null,
      error: '',
      loading: false,
      userCookie: '',
    },
  };

  const store = createMockStore(initialState);

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SignUp />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('should correct render', () => {
  it('with valid inputs', async () => {
    const store = setup();

    const emailInput = screen.getByRole('textbox', { name: 'signup.login.emailForResetPage.input.email' });
    const firstNameInput = screen.getByRole('textbox', { name: 'signup.input.firstName' });
    const lastNameInput = screen.getByRole('textbox', { name: 'signup.input.lastName' });
    const passwordInput = screen.getByLabelText(/signup.login.resetPassword.input.password \*/i);
    const repeatedPasswordInput = screen.getByLabelText(/signup.resetPassword.input.repeatedPassword \*/i);
    const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

    userEvent.type(emailInput, mockAuthUserData.email.valid);
    userEvent.type(firstNameInput, mockAuthUserData.firstName.valid);
    userEvent.type(lastNameInput, mockAuthUserData.lastName.valid);
    userEvent.type(passwordInput, mockAuthUserData.password.valid);
    userEvent.type(repeatedPasswordInput, mockAuthUserData.repeatedPassword.valid);

    userEvent.click(formButton);

    const actions = store.getActions();

    await waitFor(() => {
      expect(actions[0].type).toEqual(RegisterActionTypes.REGISTER_USER);
    });
  });

  describe('with invalid inputs', () => {
    it('required inputs', async () => {
      setup();

      const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('signup.login.emailForResetPage.input.emailRequired')).toBeInTheDocument();
        expect(screen.getByText('signup.input.firstNameRequired')).toBeInTheDocument();
        expect(screen.getByText('signup.input.lastNameRequired')).toBeInTheDocument();
        expect(screen.getByText('signup.login.resetPassword.input.passwordRequired')).toBeInTheDocument();
      });
    });

    it('invalid email', async () => {
      setup();

      const emailInput = screen.getByRole('textbox', { name: 'signup.login.emailForResetPage.input.email' });
      const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

      userEvent.type(emailInput, mockAuthUserData.email.invalid);

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('signup.login.emailForResetPage.input.emailNotValid')).toBeInTheDocument();
      });
    });

    describe('invalid first name', () => {
      it('shorter than 3 letters', async () => {
        setup();

        const firstNameInput = screen.getByRole('textbox', { name: 'signup.input.firstName' });
        const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

        userEvent.type(firstNameInput, mockAuthUserData.firstName.short);

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.input.firstNameLength')).toBeInTheDocument();
        });
      });

      it('without letters', async () => {
        setup();

        const firstNameInput = screen.getByRole('textbox', { name: 'signup.input.firstName' });
        const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

        userEvent.type(firstNameInput, mockAuthUserData.firstName.withNumbers);

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.input.firstNameNotValid')).toBeInTheDocument();
        });
      });
    });

    describe('invalid last name', () => {
      it('shorter than 3 letters', async () => {
        setup();

        const lastNameInput = screen.getByRole('textbox', { name: 'signup.input.lastName' });
        const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

        userEvent.type(lastNameInput, mockAuthUserData.lastName.short);

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.input.lastNameLength')).toBeInTheDocument();
        });
      });

      it('without letters', async () => {
        setup();

        const lastNameInput = screen.getByRole('textbox', { name: 'signup.input.lastName' });
        const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

        userEvent.type(lastNameInput, mockAuthUserData.lastName.withNumbers);

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.input.lastNameNotValid')).toBeInTheDocument();
        });
      });
    });

    describe('invalid password', () => {
      it('shorter than 6 symbols', async () => {
        setup();

        const passwordInput = screen.getByLabelText(/signup.login.resetPassword.input.password \*/i);
        const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

        userEvent.type(passwordInput, mockAuthUserData.password.short);

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.login.resetPassword.input.passwordShort')).toBeInTheDocument();
        });
      });

      it('longer than 15 symbols', async () => {
        setup();

        const passwordInput = screen.getByLabelText(/signup.login.resetPassword.input.password \*/i);
        const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

        userEvent.type(passwordInput, mockAuthUserData.password.long);

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.login.resetPassword.input.passwordLong')).toBeInTheDocument();
        });
      });
    });

    it('invalid repeated password', async () => {
      setup();

      const repeatedPasswordInput = screen.getByLabelText(/signup.resetPassword.input.repeatedPassword \*/i);
      const passwordInput = screen.getByLabelText(/signup.login.resetPassword.input.password \*/i);
      const formButton = screen.getAllByRole('button', { name: 'signup.button.signUp' })[1];

      userEvent.type(passwordInput, mockAuthUserData.password.valid);
      userEvent.type(repeatedPasswordInput, mockAuthUserData.repeatedPassword.invalid);

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('signup.resetPassword.input.repeatedPasswordRequired')).toBeInTheDocument();
      });
    });
  });
});
