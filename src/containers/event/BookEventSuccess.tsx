import React, { useEffect, VFC } from 'react';
import {
  Button, Grid, LinearProgress, Theme, Typography,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Header from '../../components/common/Header';
import { ROUTE_PAGES } from '../../constants';
import confirmEventsBooking from '../../store/actions/sendRequest/confirmEventsBooking';
import { selectApiState, selectUserState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  message: {
    marginTop: theme.spacing(12),
  },
  controlLink: {
    textDecoration: 'none',
  },
}));

const BookEventSuccess: VFC = () => {
  const classes = useStyles();
  const { data } = useSelector(selectUserState);
  const apiReducer = useSelector(selectApiState);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    dispatch(confirmEventsBooking(eventId));
  }, [eventId]);

  return (
    <Grid>
      <Header />
      {apiReducer.loading
        ? (
          <LinearProgress className={classes.message} />
        ) : (
          <Grid>
            {apiReducer.error
              ? (
                <Grid container direction="column" textAlign="center" className={classes.message}>
                  <Typography>
                    {t('bookingEventSuccess.error')}
                  </Typography>
                  <Typography variant="h4">
                    {apiReducer.error}
                  </Typography>
                </Grid>
              ) : (
                <Grid container direction="column" textAlign="center" className={classes.message}>
                  <Typography>
                    <CheckCircleIcon />
                  </Typography>
                  <Typography variant="h4">
                    {t('bookingEventSuccess.message.successBooking')}
                  </Typography>
                  <Typography variant="h5">
                    {t('bookingEventSuccess.message.checkProfile')}
                  </Typography>
                  <Grid container justifyContent="center">
                    <Grid>
                      <Link to={`${ROUTE_PAGES.profile}/${data?.userId}`} className={classes.controlLink}>
                        <Button
                          type="button"
                          variant="text"
                        >
                          {t('bookingEventSuccess.button.goProfile')}
                        </Button>
                      </Link>
                      <Link to={ROUTE_PAGES.main} className={classes.controlLink}>
                        <Button
                          type="button"
                          variant="text"
                        >
                          {t('bookingEventSuccess.button.goMain')}
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              )}
          </Grid>
        )}
    </Grid>
  );
};

export default BookEventSuccess;
