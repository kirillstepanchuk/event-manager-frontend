import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import EditProfile from '../EditProfile';
import createMockStore from '../../../mocks/store/mockStore';
import { EditUserActionTypes } from '../../../store/actionTypes';
import { mockUserData } from '../../../mocks/store/constants';

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
        <EditProfile />
      </ThemeProvider>
    </Provider>,
    { wrapper: MemoryRouter },
  );

  return store;
};

describe('should correct render', () => {
  it('with valid inputs', async () => {
    const store = setup();

    const firstNameInput = screen.getByRole('textbox', { name: 'signup.input.firstName' });
    const lastNameInput = screen.getByRole('textbox', { name: 'signup.input.lastName' });
    const descriptionInput = screen.getByRole('textbox', { name: 'editProfile.description.label' });
    const formButton = screen.getByRole('button', { name: 'editProfile.editEvent.button.saveChanges' });

    userEvent.clear(firstNameInput);
    userEvent.clear(lastNameInput);
    userEvent.clear(descriptionInput);

    userEvent.type(firstNameInput, 'Sarah');
    userEvent.type(lastNameInput, 'Conor');
    userEvent.type(descriptionInput, '123456');

    userEvent.click(formButton);

    const actions = store.getActions();

    await waitFor(async () => {
      expect(actions[0].type).toEqual(EditUserActionTypes.EDIT_USER_DATA);
    });
  });

  describe('with invalid inputs', () => {
    it('required inputs', async () => {
      setup();

      const firstNameInput = screen.getByRole('textbox', { name: 'signup.input.firstName' });
      const lastNameInput = screen.getByRole('textbox', { name: 'signup.input.lastName' });
      const formButton = screen.getByRole('button', { name: 'editProfile.editEvent.button.saveChanges' });

      userEvent.clear(firstNameInput);
      userEvent.clear(lastNameInput);

      userEvent.click(formButton);

      await waitFor(async () => {
        expect(screen.getByText('signup.input.firstNameRequired')).toBeInTheDocument();
        expect(screen.getByText('signup.input.lastNameRequired')).toBeInTheDocument();
      });
    });

    describe('invalid first name', () => {
      it('shorter than 3 letters', async () => {
        setup();

        const firstNameInput = screen.getByRole('textbox', { name: 'signup.input.firstName' });
        const formButton = screen.getByRole('button', { name: 'editProfile.editEvent.button.saveChanges' });

        userEvent.clear(firstNameInput);

        userEvent.type(firstNameInput, 'lf');

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.input.firstNameLength')).toBeInTheDocument();
        });
      });

      it('without letters', async () => {
        setup();

        const firstNameInput = screen.getByRole('textbox', { name: 'signup.input.firstName' });
        const formButton = screen.getByRole('button', { name: 'editProfile.editEvent.button.saveChanges' });

        userEvent.clear(firstNameInput);

        userEvent.type(firstNameInput, '122');

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
        const formButton = screen.getByRole('button', { name: 'editProfile.editEvent.button.saveChanges' });

        userEvent.clear(lastNameInput);

        userEvent.type(lastNameInput, 'lf');

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.input.lastNameLength')).toBeInTheDocument();
        });
      });

      it('without letters', async () => {
        setup();

        const lastNameInput = screen.getByRole('textbox', { name: 'signup.input.lastName' });
        const formButton = screen.getByRole('button', { name: 'editProfile.editEvent.button.saveChanges' });

        userEvent.clear(lastNameInput);

        userEvent.type(lastNameInput, '122');

        userEvent.click(formButton);

        await waitFor(async () => {
          expect(screen.getByText('signup.input.lastNameNotValid')).toBeInTheDocument();
        });
      });
    });
  });
});
