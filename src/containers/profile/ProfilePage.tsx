import {
  Grid, LinearProgress, Theme, Typography,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useCallback, useState, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Container from '../../components/common/Container';

import EventCard from '../../components/common/EventCard';
import Header from '../../components/common/Header';
import { PROFILE_EVENTS_TYPES, ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import EventCategoriesModal from '../Modals/EventCategoriesModal';
import { selectProfileEventsState } from '../../store/selectors/selectors';
import ProfileHeader from './ProfileHeader';

const useStyles = makeStyles((theme: Theme) => createStyles({
  loader: {
    marginTop: theme.spacing(8),
  },
  events: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
  },
}));

const ProfilePage: VFC = () => {
  const classes = useStyles();
  const { data, error, loading } = useSelector(selectProfileEventsState);
  const [modal, setModal] = useState<boolean>(false);
  const { t } = useTranslation();

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const openModal = useCallback(() => {
    setModal(true);
  }, []);

  return (
    <Grid>
      <Header />
      <Container>
        <ProfileHeader open={openModal} />
        {loading
          ? (
            <LinearProgress className={classes.loader} />
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
                          key={event.id}
                          timeZone={event.timeZone}
                          preview={event.preview!}
                          link={`${ROUTE_PAGES.event}/${event.id}`}
                          linkText="Show event"
                        />
                      ),
                    )}
                  </Grid>
                ) : (
                  <Grid container justifyContent="center">
                    <Typography>
                      {error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error}
                    </Typography>
                  </Grid>
                )}
            </Grid>
          )}
      </Container>
      {modal
        ? <EventCategoriesModal close={closeModal} />
        : (
          <>
          </>
        )}
    </Grid>
  );
};

export default ProfilePage;
