import React, { VFC } from 'react';
import {
  Button,
  Grid, LinearProgress, Theme, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import EventCard from '../../components/common/EventCard';
import { EventCategory } from '../../types/events';
import { ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import { selectEventsState } from '../../store/selectors/selectors';
import Container from '../../components/common/Container';

const useStyles = makeStyles((theme: Theme) => createStyles({
  categoryLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

const EventsCategories: VFC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { data, error } = useSelector(selectEventsState);

  return (
    <Container>
      {data
        ? (
          <Grid>
            {data.slice(0).map(
              (eventsCategory: EventCategory) => (
                <Grid>
                  <Grid>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h5">
                          {eventsCategory.category}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Link to={`${ROUTE_PAGES.eventsCategory}/${eventsCategory.category}`} className={classes.categoryLink}>
                          <Button variant="text" color="primary">
                            {t('mainPage.button.showAll')}
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container>
                    {eventsCategory.eventCards.map(
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
                </Grid>
              ),
            )}
          </Grid>
        )
        : (
          <Grid>
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
  );
};

export default EventsCategories;
