import React, {
  useCallback, useEffect, useState, VFC, ChangeEvent,
} from 'react';
import {
  Grid, LinearProgress, Typography, Theme, Button, Pagination,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import Header from '../../components/common/Header';
import loadSearchedEventsData from '../../store/actions/loadEventsData/loadSearchedEvents';
import EventCard from '../../components/common/EventCard';
import SearchControl from '../../components/common/SearchControl';
import { ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import { selectSearchedEventsState } from '../../store/selectors/selectors';
import Container from '../../components/common/Container';

const useStyles = makeStyles((theme: Theme) => createStyles({
  buttonGrid: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-around',
    },
  },
  backLink: {
    textDecoration: 'none',
  },
}));

const SearchPage: VFC = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const { title } = queryString.parse(location.search);
  const { data, error, loading } = useSelector(selectSearchedEventsState);
  const classes = useStyles();
  const { t } = useTranslation();

  const onPageChange = useCallback((evt: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  useEffect(() => {
    dispatch(loadSearchedEventsData(title as string, page));
  }, [title, page]);

  if (loading) {
    return (
      <LinearProgress />
    );
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
    <Grid>
      <Header />
      <Container>
        <Grid container direction="column">
          <Grid>
            <SearchControl controlTitle={`${t('searchControl.title.searchResults')} "${title}"`} page={page} />
            <Grid container className={classes.buttonGrid}>
              <Grid>
                <Link
                  className={classes.backLink}
                  to={ROUTE_PAGES.main}
                >
                  <Button
                    type="button"
                    variant="contained"
                  >
                    {t('searchPage.button.back')}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            {data?.events.length === 0
              ? <Grid item xs={12} textAlign="center"><Typography variant="h4">{t('searchPage.content.noItems')}</Typography></Grid>
              : data?.events.slice(0).map(
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
          <Grid container justifyContent="center">
            <Pagination count={data?.pageCount} page={page} onChange={onPageChange} />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default SearchPage;
