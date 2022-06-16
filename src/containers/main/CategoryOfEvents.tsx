import {
  Grid, Typography, LinearProgress, Theme, Button, Pagination,
} from '@mui/material';
import React, {
  useCallback, useEffect, useState, VFC, ChangeEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createStyles, makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import EventCard from '../../components/common/EventCard';
import loadEventsCategoryData from '../../store/actions/loadEventsData/loadCategorizedEventsData';
import { ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import { selectEventsCategoryState } from '../../store/selectors/selectors';
import Container from '../../components/common/Container';

const useStyles = makeStyles((theme: Theme) => createStyles({
  eventsGrid: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(8),
  },
  categoryTitle: {
    marginLeft: theme.spacing(14),
    marginBottom: theme.spacing(3),
  },
  categoryClose: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const CategoryOfEvents: VFC = () => {
  const [page, setPage] = useState(1);
  const { data, error, loading } = useSelector(selectEventsCategoryState);
  const { category } = useParams<{ category: string }>();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(loadEventsCategoryData(category, page));
  }, [category, page]);

  const onPageChange = useCallback((evt: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }, []);

  if (loading) {
    return (
      <LinearProgress />
    );
  }

  if (error) {
    return (
      <Grid item xs={12} textAlign="center">
        <Typography variant="h4">
          {error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error}
        </Typography>
      </Grid>
    );
  }

  return (
    <Container>
      <Grid alignItems="center">
        <Typography variant="h5">
          {`${t('categoryPage.title.category')}: ${category}'s`}
          <Link to={ROUTE_PAGES.main} className={classes.categoryClose}>
            <Button
              variant="text"
            >
              <CloseIcon />
            </Button>
          </Link>
        </Typography>
      </Grid>

      <Grid container>
        {data?.events.slice(0).map(
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
        <Grid container justifyContent="center">
          <Pagination count={data?.pageCount} page={page} onChange={onPageChange} />
        </Grid>
      </Grid>
    </Container>

  );
};

export default CategoryOfEvents;
