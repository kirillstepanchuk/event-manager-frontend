import {
  Grid, LinearProgress, Theme, Typography,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useCallback, VFC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import EventCard from '../../components/common/EventCard';
import Header from '../../components/common/Header';
import { ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import UserProfileHeader from './UserProfileHeader';
import Container from '../../components/common/Container';
import { selectClientEventsState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  events: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
  },
}));

const UserProfile: VFC = () => {
  const classes = useStyles();
  const { data, error, loading } = useSelector(selectClientEventsState);
  const { t } = useTranslation();

  const eventLink = useCallback((eventId: string) => `${ROUTE_PAGES.event}/${eventId}`, []);

  return (
    <Grid>
      <Header />
      <Container>
        <UserProfileHeader />
        {loading
          ? (
            <LinearProgress />
          ) : (
            <Grid className={classes.events}>
              {data
                ? (
                  <Grid container>
                    {data?.events.slice(0).map(
                      (event) => (
                        <EventCard
                          title={event.title}
                          date={event.eventDate}
                          time={event.eventTime}
                          timeZone={event.timeZone!}
                          key={event.id}
                          preview={event.preview!}
                          link={eventLink(event.id.toString())}
                          linkText="Show event"
                        />
                      ),
                    )}
                  </Grid>
                ) : (
                  <Grid container justifyContent="center">
                    <Typography>
                      {(error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error) || data}
                    </Typography>
                  </Grid>
                )}
            </Grid>
          )}
      </Container>
    </Grid>
  );
};

export default UserProfile;
