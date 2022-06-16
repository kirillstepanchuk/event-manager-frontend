import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import BookEvent from '../BookEvent';
import createMockStore, { InitialMockState } from '../../../mocks/store/mockStore';
import { mockEvent, mockUserData, mockAuthUserData } from '../../../mocks/store/constants';
import { CreatePaymentSessionActionTypes } from '../../../store/actionTypes';

const theme = createTheme();

const setup = () => {
  const initialState: InitialMockState = {
    api: {
      data: null,
      error: null,
      loading: false,
    },
    event: {
      data: mockEvent,
      loading: false,
      error: '',
    },
    user: {
      data: mockUserData,
      error: null,
      loading: false,
      userCookie: '12',
    },
  };

  const store = createMockStore(initialState);

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BookEvent />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('should correct render', () => {
  describe('with valid inputs', () => {
    it('correct form pre-filling with user data', () => {
      setup();

      const customerInfoFirstName = screen.getByRole('textbox', { name: 'signup.input.firstName' });
      const customerInfoLastName = screen.getByRole('textbox', { name: 'signup.input.lastName' });
      const customerInfoEmail = screen.getByRole('textbox', { name: 'signup.login.emailForResetPage.input.email' });

      expect(customerInfoFirstName).toHaveValue(mockUserData.firstName);
      expect(customerInfoLastName).toHaveValue(mockUserData.lastName);
      expect(customerInfoEmail).toHaveValue(mockUserData.email);
    });

    it('sends request', async () => {
      const store = setup();

      const amountOfPeopleStandartInput = screen.getByRole('textbox', { name: 'bookingEvent.label.amountOfPeople - Standart' });
      const amountOfPeopleVIPInput = screen.getByRole('textbox', { name: 'bookingEvent.label.amountOfPeople - VIP' });

      userEvent.type(amountOfPeopleStandartInput, '1');
      userEvent.type(amountOfPeopleVIPInput, '1');

      const creditCardRadioButton: HTMLInputElement = screen.getByRole('radio', { name: 'bookingEvent.radio.creditCard (MasterCard, Visa)' });
      userEvent.click(creditCardRadioButton);

      const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });
      userEvent.click(bookTicketsButton);

      const actions = store.getActions();

      await waitFor(() => {
        expect(creditCardRadioButton.checked).toEqual(true);
        expect(actions[0].type).toEqual(CreatePaymentSessionActionTypes.CREATE_PAYMENT_SESSION);
      });
    });
  });

  describe('with invalid inputs', () => {
    describe('amount of people input', () => {
      it('amount = 0', async () => {
        setup();

        const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });

        userEvent.click(bookTicketsButton);

        await waitFor(() => {
          expect(screen.getAllByText('bookEvent.amountOfPeople.onePersonRequired')).toHaveLength(2);
          expect(screen.getByText('bookEvent.payment.paymentIsRequired')).toBeInTheDocument();
        });
      });
    });

    describe('customer information', () => {
      describe('customer first name', () => {
        it('empty first name', async () => {
          setup();

          const customerInfoFirstName = screen.getByRole('textbox', { name: 'signup.input.firstName' });
          const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });

          userEvent.clear(customerInfoFirstName);
          userEvent.click(bookTicketsButton);

          await waitFor(() => {
            expect(screen.getByText('signup.input.firstNameRequired')).toBeInTheDocument();
          });
        });

        it('shorter than 3 letters', async () => {
          setup();

          const customerInfoFirstName = screen.getByRole('textbox', { name: 'signup.input.firstName' });
          const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });

          userEvent.clear(customerInfoFirstName);
          userEvent.type(customerInfoFirstName, mockAuthUserData.firstName.short);
          userEvent.click(bookTicketsButton);

          await waitFor(() => {
            expect(screen.getByText('signup.input.firstNameLength')).toBeInTheDocument();
          });
        });

        it('contains numbers', async () => {
          setup();

          const customerInfoFirstName = screen.getByRole('textbox', { name: 'signup.input.firstName' });
          const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });

          userEvent.clear(customerInfoFirstName);
          userEvent.type(customerInfoFirstName, mockAuthUserData.firstName.withNumbers);
          userEvent.click(bookTicketsButton);

          await waitFor(() => {
            expect(screen.getByText('signup.input.firstNameNotValid')).toBeInTheDocument();
          });
        });
      });

      describe('customer last name', () => {
        it('empty last name', async () => {
          setup();

          const customerInfoLastName = screen.getByRole('textbox', { name: 'signup.input.lastName' });
          const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });

          userEvent.clear(customerInfoLastName);
          userEvent.click(bookTicketsButton);

          await waitFor(() => {
            expect(screen.getByText('signup.input.lastNameRequired')).toBeInTheDocument();
          });
        });

        it('shorter than 3 letters', async () => {
          setup();

          const customerInfoLastName = screen.getByRole('textbox', { name: 'signup.input.lastName' });
          const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });

          userEvent.clear(customerInfoLastName);
          userEvent.type(customerInfoLastName, mockAuthUserData.lastName.short);
          userEvent.click(bookTicketsButton);

          await waitFor(() => {
            expect(screen.getByText('signup.input.lastNameLength')).toBeInTheDocument();
          });
        });

        it('contains numbers', async () => {
          setup();

          const customerInfoLastName = screen.getByRole('textbox', { name: 'signup.input.lastName' });
          const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });

          userEvent.clear(customerInfoLastName);
          userEvent.type(customerInfoLastName, mockAuthUserData.lastName.withNumbers);
          userEvent.click(bookTicketsButton);

          await waitFor(() => {
            expect(screen.getByText('signup.input.lastNameNotValid')).toBeInTheDocument();
          });
        });
      });

      describe('customer email', () => {
        it('empty email', async () => {
          setup();

          const customerInfoEmail = screen.getByRole('textbox', { name: 'signup.login.emailForResetPage.input.email' });
          const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });

          userEvent.clear(customerInfoEmail);
          userEvent.click(bookTicketsButton);

          await waitFor(() => {
            expect(screen.getByText('signup.login.emailForResetPage.input.emailRequired')).toBeInTheDocument();
          });
        });

        it('invalid email', async () => {
          setup();

          const customerInfoEmail = screen.getByRole('textbox', { name: 'signup.login.emailForResetPage.input.email' });
          const bookTicketsButton = screen.getByRole('button', { name: 'eventInfo.button.book' });

          userEvent.type(customerInfoEmail, mockAuthUserData.email.invalid);
          userEvent.click(bookTicketsButton);

          await waitFor(() => {
            expect(screen.getByText('signup.login.emailForResetPage.input.emailNotValid')).toBeInTheDocument();
          });
        });
      });
    });
  });
});
