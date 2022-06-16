import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ChangePassword from '../ChangePassword';
import createMockStore from '../../../mocks/store/mockStore';
import { mockUserData, mockAxiosResponse } from '../../../mocks/store/constants';
import * as api from '../../../api/user.api';

const theme = createTheme();

const setup = () => {
  const initialState = {
    user: {
      data: mockUserData,
      error: '',
      loading: false,
      userCookie: '',
    },
  };

  const store = createMockStore(initialState);

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ChangePassword />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('should correct render', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('with valid inputs', async () => {
    const changePassword = jest.spyOn(api, 'fetchChangePassword')
      .mockImplementation(() => Promise.resolve(mockAxiosResponse));

    setup();

    const currentPasswordInput = screen.getByLabelText(/changePassword.label.currentPassword \*/i);
    const newPasswordInput = screen.getByLabelText(/changePassword.label.newPassword \*/i);
    const repeatedNewPasswordInput = screen.getByLabelText(/changePassword.label.repeatedNewPassword \*/i);
    const formButton = screen.getByRole('button', { name: 'changePassword.button.confirm' });

    userEvent.type(currentPasswordInput, '111111');
    userEvent.type(newPasswordInput, '123456');
    userEvent.type(repeatedNewPasswordInput, '123456');

    userEvent.click(formButton);

    await waitFor(async () => {
      expect(changePassword).toHaveBeenCalledTimes(1);
    });
  });

  describe('with invalid inputs', () => {
    it('required inputs', async () => {
      setup();

      const formButton = screen.getByRole('button', { name: 'changePassword.button.confirm' });

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('changePassword.input.currentPasswordRequired')).toBeInTheDocument();
        expect(screen.getByText('changePassword.input.newPasswordRequired')).toBeInTheDocument();
      });
    });

    describe('invalid current password', () => {
      it('shorter than 6 symbols', async () => {
        setup();

        const currentPasswordInput = screen.getByLabelText(/changePassword.label.currentPassword \*/i);
        const formButton = screen.getByRole('button', { name: 'changePassword.button.confirm' });

        userEvent.type(currentPasswordInput, '123');

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.login.resetPassword.input.passwordShort')).toBeInTheDocument();
        });
      });

      it('longer than 15 symbols', async () => {
        setup();

        const currentPasswordInput = screen.getByLabelText(/changePassword.label.currentPassword \*/i);
        const formButton = screen.getByRole('button', { name: 'changePassword.button.confirm' });

        userEvent.type(currentPasswordInput, '12312312312312333');

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.login.resetPassword.input.passwordLong')).toBeInTheDocument();
        });
      });
    });

    describe('invalid new password', () => {
      it('shorter than 6 symbols', async () => {
        setup();

        const newPasswordInput = screen.getByLabelText(/changePassword.label.newPassword \*/i);
        const formButton = screen.getByRole('button', { name: 'changePassword.button.confirm' });

        userEvent.type(newPasswordInput, '123');

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.login.resetPassword.input.passwordShort')).toBeInTheDocument();
        });
      });

      it('longer than 15 symbols', async () => {
        setup();

        const newPasswordInput = screen.getByLabelText(/changePassword.label.newPassword \*/i);
        const formButton = screen.getByRole('button', { name: 'changePassword.button.confirm' });

        userEvent.type(newPasswordInput, '12312312312312333');

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.login.resetPassword.input.passwordLong')).toBeInTheDocument();
        });
      });
    });

    it('invalid repeated new password', async () => {
      setup();

      const newPasswordInput = screen.getByLabelText(/changePassword.label.newPassword \*/i);
      const repeatedNewPasswordInput = screen.getByLabelText(/changePassword.label.repeatedNewPassword \*/i);
      const formButton = screen.getByRole('button', { name: 'changePassword.button.confirm' });

      userEvent.type(newPasswordInput, '123456');
      userEvent.type(repeatedNewPasswordInput, '123455');

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('signup.resetPassword.input.repeatedPasswordRequired')).toBeInTheDocument();
      });
    });
  });
});
