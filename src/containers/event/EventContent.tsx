import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  Button,
  CircularProgress,
  Grid, LinearProgress, Snackbar, Theme, Typography, useTheme,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { makeStyles, createStyles } from '@mui/styles';
import { Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

import loadEventData from '../../store/actions/loadEventData/loadEventData';
import { ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import { Position } from '../../types/events';
import approveEvent from '../../store/actions/sendRequest/approveEvent';
import deleteEvent from '../../store/actions/sendRequest/deleteEvent';
import Map from '../../components/common/Map';
import OrganizerModal from '../Modals/OrganizerModal';
import AddEventToCalButton from '../../components/AddEventToCalButton';
import {
  selectApiState, selectCalendarEventState, selectEventState, selectUserState,
} from '../../store/selectors/selectors';
import { closeCalendarNotification } from '../../store/actions/addEventInCalendar/addEventInCalendar';
import closeAlert from '../../store/actions/sendRequest/closeAlert';

const useStyles = makeStyles((theme: Theme) => createStyles({
  eventPreview: {
    objectFit: 'cover',
  },
  topInfo: {
    marginLeft: theme.spacing(12),
  },
  bookLink: {
    textDecoration: 'none',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  description: {
    textIndent: '50px',
    marginTop: theme.spacing(2),
  },
  address: {
    fontWeight: 'bold',
    margin: '0 auto',
    marginTop: theme.spacing(4),
  },
  date: {
    marginTop: theme.spacing(4),
  },
  similarLink: {
    dispaly: 'block',
    textDecoration: 'none',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  calendarGrid: {
    [theme.breakpoints.down('lg')]: {
      alignItems: 'start',
    },
  },
  map: {
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
  },
  organizerButton: {
    textTransform: 'initial',
  },
  closeAlert: {
    color: theme.palette.secondary.light,
  },
}));

const containerStyle = {
  width: '70vw',
  height: '50vh',
};

const EventContent = () => {
  const { data, loading, error } = useSelector(selectEventState);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [date, setDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [modal, setModal] = useState<boolean>(false);
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const user = useSelector(selectUserState);
  const calendarEvent = useSelector(selectCalendarEventState);
  const apiReducer = useSelector(selectApiState);

  const getDiffBetweenDates = (eventDate: Date | string): number | string => {
    const nowDate = new Date();
    const currentEventDate = new Date(eventDate);

    const diffTime = currentEventDate.getTime() - nowDate.getTime();
    if (diffTime < 0) {
      return `${t('eventInfo.subtitle.eventHasEnded')}`;
    }
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${t('eventInfo.subtitle.daysBefore')}: ${diffDays}`;
  };

  const center: Position = {
    lng: data?.lng!,
    lat: data?.lat!,
  };

  const formatDate = useCallback((): void => {
    if (data) {
      const eventFullDate = new Date(data.eventDate);
      const eventEndFullDate = new Date(data.eventEndDate);
      setDate(eventFullDate.toLocaleDateString('en-US'));
      setEndDate(eventEndFullDate.toLocaleDateString('en-US'));
      setEndTime(`${eventEndFullDate.getHours()}:${(eventEndFullDate.getMinutes() < 10 ? '0' : '') + eventEndFullDate.getMinutes()}`);
      setStartTime(`${eventFullDate.getHours()}:${(eventFullDate.getMinutes() < 10 ? '0' : '') + eventFullDate.getMinutes()}`);
    }
  }, [data]);

  useEffect(() => {
    dispatch(loadEventData(id));
  }, [id]);

  useEffect(() => {
    formatDate();
  }, [formatDate]);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const openModal = useCallback(() => {
    setModal(true);
  }, []);

  const closeNotification = useCallback(() => {
    dispatch(closeCalendarNotification());
  }, []);

  const closeApiAlert = useCallback(() => {
    dispatch(closeAlert());
  }, []);

  const approvePendingEvent = useCallback(() => {
    dispatch(approveEvent(id));
  }, []);

  const deletePendingEvent = useCallback(() => {
    dispatch(deleteEvent(id));
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  if (error) {
    return (
      <Grid item xs={12} textAlign="center">
        <Typography>
          {error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid container spacing={2}>
        <Grid item>
          <img src={data?.preview} alt="event preview" width="250" height="300" className={classes.eventPreview} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h3">{data?.title}</Typography>
              <Typography>{data?.category}</Typography>
              <Typography className={classes.date}>{`${t('eventForm.date.startsAt')}: ${date} ${startTime}`}</Typography>
              <Typography>
                {`${t('eventForm.date.endsAt')}: ${endDate} ${endTime}`}
              </Typography>
              <Typography>
                {getDiffBetweenDates(date as string)}
              </Typography>
              {data?.organizerId === user.data?.userId
                ? (
                  <Typography>
                    {data?.isApproved ? t('eventInfo.status.approved') : t('eventInfo.status.unapproved')}
                  </Typography>
                ) : (
                  <>
                  </>
                )}
              <Link to={`${ROUTE_PAGES.eventsCategory}/${data?.category}`} className={classes.link}>
                <Button variant="contained" className={classes.similarLink}>{t('eventInfo.button.similarEvents')}</Button>
              </Link>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="end" className={classes.calendarGrid}>
              <AddEventToCalButton id={id} />
              {calendarEvent.loading && <CircularProgress />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button
        onClick={openModal}
        className={classes.organizerButton}
      >
        {`${t('eventForm.button.organizerInfo')}`}
      </Button>
      <Typography className={classes.description}>{data?.description}</Typography>
      <Grid className={classes.map} container direction="column">
        <Typography className={classes.address}>{data?.address}</Typography>
        <Map
          containerStyle={containerStyle}
          center={center}
        >
          <Marker position={center} />
        </Map>
        {data?.organizerId === user.data?.userId
          ? (
            <Grid container justifyContent="center">
              {data?.isApproved
                ? (
                  <Link to={`${ROUTE_PAGES.buyAdvertisement}/${data?.id}`} className={classes.bookLink}>
                    <Button>{`${t('eventForm.button.buyAdvertisement')}`}</Button>
                  </Link>
                ) : (
                  <Link to={`${ROUTE_PAGES.editEvent}/${data?.id}`} className={classes.bookLink}>
                    <Button>{`${t('eventInfo.button.editEvent')}`}</Button>
                  </Link>
                )}
            </Grid>
          ) : (
            <Link to={`${ROUTE_PAGES.bookEvent}/${data?.id}`} className={classes.bookLink}>
              <Button>{t('eventInfo.button.book')}</Button>
            </Link>
          )}
        {!data?.isApproved && (user.data?.role === 'admin' || user.data?.role === 'super-admin')
          ? (
            <Grid>
              <Grid container justifyContent="center">
                {apiReducer.loading && <CircularProgress />}
              </Grid>
              <Button
                onClick={approvePendingEvent}
              >
                {t('eventInfo.button.approve')}
              </Button>
              <Button
                onClick={deletePendingEvent}
              >
                {t('eventInfo.button.block')}
              </Button>
            </Grid>
          ) : (
            <>
            </>
          )}
        <Grid container justifyContent="center">
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!calendarEvent.data || !!calendarEvent.error}
            autoHideDuration={6000}
            message={calendarEvent.data || calendarEvent.error}
            action={(
              <Button onClick={closeNotification} className={classes.closeAlert}>
                <CloseIcon />
              </Button>
            )}
          />
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!apiReducer.data || !!apiReducer.error}
            autoHideDuration={6000}
            message={apiReducer.data || apiReducer.error}
            action={(
              <Button onClick={closeApiAlert} className={classes.closeAlert}>
                <CloseIcon />
              </Button>
            )}
          />
        </Grid>
        {(data?.organizerId === user.data?.userId || (user.data?.role === 'admin' || user.data?.role === 'super-admin')) && (
          <Link to={`${ROUTE_PAGES.eventConversation}/${data?.id}`} className={classes.bookLink}>
            <Button>Join chat</Button>
          </Link>
        )}
      </Grid>
      {modal
        ? (
          <OrganizerModal close={closeModal} />
        ) : (
          <>
          </>
        )}
    </Grid>
  );
};

export default EventContent;
