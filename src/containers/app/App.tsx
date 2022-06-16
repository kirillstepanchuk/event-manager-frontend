import React, {
  lazy, Suspense, useEffect, VFC,
} from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import LinearProgress from '@mui/material/LinearProgress';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';

import { ROUTE_PAGES, LANGS } from '../../constants';
import { history } from '../../store/reducers/root';
import getCurrentUser from '../../store/actions/getUser/getUser';
import { selectUserState } from '../../store/selectors/selectors';
import enTranslation from '../../assets/locales/en/translation.json';
import deTranslation from '../../assets/locales/de/translation.json';

const SignUp = lazy(() => import('../auth/SignUp'));
const LogIn = lazy(() => import('../auth/LogIn'));
const EmailForPasswordReset = lazy(() => import('../auth/EmailForPasswordReset'));
const ResetPassword = lazy(() => import('../auth/ResetPassword'));
const CheckEmail = lazy(() => import('../auth/CheckEmail'));
const RegisterStatus = lazy(() => import('../auth/RegisterStatus'));
const MainPage = lazy(() => import('../main/MainPage'));
const CategoryPage = lazy(() => import('../main/CategoryPage'));
const SearchPage = lazy(() => import('../main/SearchPage'));
const ProfilePage = lazy(() => import('../profile/ProfilePage'));
const EditProfile = lazy(() => import('../profile/EditProfile'));
const ChangePassword = lazy(() => import('../profile/ChangePassword'));
const Map = lazy(() => import('../map/MapPage'));
const CreateNewEvent = lazy(() => import('../event/CreateNewEvent'));
const EditEvent = lazy(() => import('../event/EditEvent'));
const EventPage = lazy(() => import('../event/EventPage'));
const BookEvent = lazy(() => import('../event/BookEvent'));
const BuyAdvertisement = lazy(() => import('../event/BuyAdvertisement'));
const BookEventSuccess = lazy(() => import('../event/BookEventSuccess'));
const BuyAdvertisementSuccess = lazy(() => import('../event/BuyAdvertisementSuccess'));
const PendingEvents = lazy(() => import('../main/PendingEvents'));
const ClientsPage = lazy(() => import('../main/ClientsPage'));
const UserProfile = lazy(() => import('../profile/UserProfile'));
const EditUser = lazy(() => import('../profile/EditClient'));
const ImportClientsPage = lazy(() => import('../main/ImportClientsPage'));
const EventConversation = lazy(() => import('../event/EventConversation'));

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      de: {
        translation: deTranslation,
      },
    },
    fallbackLng: LANGS.en,
    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: blue,
    secondary: {
      main: blueGrey[500],
      dark: '#000000',
      light: '#ffffff',
    },

  },
  spacing: 5,
  typography: {
    fontSize: 16,
    fontFamily: 'Arial',
    button: {
      fontSize: 20,
    },
  },
}));

const App: VFC = () => {
  const dispatch = useDispatch();
  const { userCookie } = useSelector(selectUserState);
  useEffect(() => {
    if (userCookie) {
      dispatch(getCurrentUser());
    }
  }, [userCookie]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConnectedRouter history={history}>
        <Suspense fallback={<LinearProgress />}>
          <Switch>
            <Route exact path={ROUTE_PAGES.main}>
              <MainPage />
            </Route>
            <Route path={`${ROUTE_PAGES.eventsCategory}/:category`}>
              <CategoryPage />
            </Route>
            <Route path={ROUTE_PAGES.searchedEvents}>
              <SearchPage />
            </Route>
            <Route path={ROUTE_PAGES.signup}>
              <SignUp />
            </Route>
            <Route path={ROUTE_PAGES.login}>
              <LogIn />
            </Route>
            <Route path={ROUTE_PAGES.checkEmail}>
              <CheckEmail />
            </Route>
            <Route path={ROUTE_PAGES.registerStatus}>
              <RegisterStatus />
            </Route>
            <Route path={ROUTE_PAGES.resetPasswordEmail}>
              <EmailForPasswordReset />
            </Route>
            <Route path={ROUTE_PAGES.resetPassword}>
              <ResetPassword />
            </Route>
            <Route path={ROUTE_PAGES.profile}>
              <ProfilePage />
            </Route>
            <Route path={ROUTE_PAGES.editProfile}>
              <EditProfile />
            </Route>
            <Route path={ROUTE_PAGES.changePassword}>
              <ChangePassword />
            </Route>
            <Route path={ROUTE_PAGES.map}>
              <Map />
            </Route>
            <Route path={ROUTE_PAGES.createEvent}>
              <CreateNewEvent />
            </Route>
            <Route path={`${ROUTE_PAGES.editEvent}/:eventId`}>
              <EditEvent />
            </Route>
            <Route path={`${ROUTE_PAGES.event}/:id`}>
              <EventPage />
            </Route>
            <Route path={`${ROUTE_PAGES.bookEvent}/:id`}>
              <BookEvent />
            </Route>
            <Route path={`${ROUTE_PAGES.buyAdvertisement}/:eventId`}>
              <BuyAdvertisement />
            </Route>
            <Route path={`${ROUTE_PAGES.bookEventState}/:eventId`}>
              <BookEventSuccess />
            </Route>
            <Route path={`${ROUTE_PAGES.buyAdvertisementStatus}/:eventId`}>
              <BuyAdvertisementSuccess />
            </Route>
            <Route path={ROUTE_PAGES.pendingEvents}>
              <PendingEvents />
            </Route>
            <Route path={ROUTE_PAGES.clients}>
              <ClientsPage />
            </Route>
            <Route path={`${ROUTE_PAGES.client}/:clientId`}>
              <UserProfile />
            </Route>
            <Route path={`${ROUTE_PAGES.editClient}/:clientId`}>
              <EditUser />
            </Route>
            <Route path={ROUTE_PAGES.importClients}>
              <ImportClientsPage />
            </Route>
            <Route path={`${ROUTE_PAGES.eventConversation}/:eventId`}>
              <EventConversation />
            </Route>
            <Redirect to={ROUTE_PAGES.main} />
          </Switch>
        </Suspense>
      </ConnectedRouter>
    </ThemeProvider>
  );
};

export default App;
