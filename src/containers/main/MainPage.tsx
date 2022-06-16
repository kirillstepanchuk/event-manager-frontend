import React, {
  useEffect, VFC, useState, useCallback,
} from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Controls from './Controls';
import EventsCategories from './EventsCategories';
import NotificationsModal from '../Modals/NotificationsModal';
import { COOKIES } from '../../constants';
import { getCookie, setCookie } from '../../utils/cookiesUtils';
import loadEventsData from '../../store/actions/loadEventsData/loadEventsData';
import { selectUserState } from '../../store/selectors/selectors';

const MainPage: VFC = () => {
  const [modal, setModal] = useState(false);
  const { data } = useSelector(selectUserState);
  const notificationsCookie = getCookie(COOKIES.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!notificationsCookie) {
      setModal(true);
    }
  }, [notificationsCookie]);

  useEffect(() => {
    dispatch(loadEventsData());
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
    setCookie(COOKIES.notifications, 'chosen');
  }, []);

  return (
    <Grid>
      <Controls />
      <EventsCategories />
      {modal && data?.firstName && <NotificationsModal close={closeModal} />}
    </Grid>
  );
};

export default MainPage;
