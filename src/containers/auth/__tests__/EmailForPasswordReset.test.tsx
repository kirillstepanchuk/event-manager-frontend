import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import EmailForPasswordReset from '../EmailForPasswordReset';
import createMockStore, { InitialMockState } from '../../../mocks/store/mockStore';
import { mockAuthUserData } from '../../../mocks/store/constants';
import { SendEmailForPasswordResetActionTypes } from '../../../store/actionTypes';

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
        <EmailForPasswordReset />
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
    const formButton = screen.getByRole('button', { name: 'emailForResetPage.button.send' });

    userEvent.type(emailInput, mockAuthUserData.email.valid);

    userEvent.click(formButton);

    const actions = store.getActions();

    await waitFor(() => {
      expect(actions[0].type).toEqual(
        SendEmailForPasswordResetActionTypes.SEND_EMAIL_FOR_PASSWORD_RESET,
      );
    });
  });

  describe('with invalid inputs', () => {
    it('required inputs', async () => {
      setup();

      const formButton = screen.getByRole('button', { name: 'emailForResetPage.button.send' });

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('signup.login.emailForResetPage.input.emailRequired')).toBeInTheDocument();
      });
    });

    it('invalid email', async () => {
      setup();

      const emailInput = screen.getByRole('textbox', { name: 'signup.login.emailForResetPage.input.email' });
      const formButton = screen.getByRole('button', { name: 'emailForResetPage.button.send' });

      userEvent.type(emailInput, mockAuthUserData.email.invalid);

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('signup.login.emailForResetPage.input.emailNotValid')).toBeInTheDocument();
      });
    });
  });
});
