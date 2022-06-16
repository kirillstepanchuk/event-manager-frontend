import React, { useEffect, VFC } from 'react';
import {
  Grid, LinearProgress, Theme, Typography,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import loadUnapprovedEvents from '../../store/actions/loadEventsData/loadUnnaprovedEvents';
import { ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import EventCard from '../../components/common/EventCard';
import Container from '../../components/common/Container';
import { selectUnnaprovedEvents } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  statusGrid: {
    marginTop: theme.spacing(12),
  },
}));

const PendingEvents: VFC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, error } = useSelector(selectUnnaprovedEvents);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadUnapprovedEvents());
  }, []);

  return (
    <Grid>
      <Header />
      <Container>
        {data
          ? (
            <Grid container className={classes.statusGrid}>
              {data.length === 0
                ? <Grid item xs={12} textAlign="center"><Typography variant="h4">{t('pendingEvents.title.noEvents')}</Typography></Grid>
                : data?.slice(0).map(
                  (event) => (
                    <EventCard
                      title={event.title}
                      date={event.eventDate}
                      time={event.eventTime}
                      key={event.id}
                      preview={event.preview}
                      timeZone={event.timeZone}
                      link={`${ROUTE_PAGES.event}/${event.id}`}
                      linkText="Show event"
                    />
                  ),
                )}
            </Grid>
          )
          : (
            <Grid className={classes.statusGrid}>
              {error
                ? (
                  <Grid item xs={12} textAlign="center">
                    <Typography>
                      {error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error}
                    </Typography>
                  </Grid>
                )
                : (
                  <LinearProgress />
                )}
            </Grid>
          )}
      </Container>
    </Grid>
  );
};

export default PendingEvents;
