import React, { useEffect, VFC } from 'react';
import {
  Button, Grid, LinearProgress, Theme, Typography,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Header from '../../components/common/Header';
import { ROUTE_PAGES } from '../../constants';
import confirmEventAdvertisement from '../../store/actions/sendRequest/confirmAdvertisementPayment';
import { selectApiState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  message: {
    marginTop: theme.spacing(12),
  },
  controlLink: {
    textDecoration: 'none',
  },
}));

const BuyAdvertisementSuccess: VFC = () => {
  const classes = useStyles();
  const apiReducer = useSelector(selectApiState);
  const { eventId } = useParams<{ eventId: string }>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(confirmEventAdvertisement(eventId));
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
                    {t('buyinAdvertisementSuccess.message.successBuying')}
                  </Typography>
                  <Grid container justifyContent="center">
                    <Grid>
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

export default BuyAdvertisementSuccess;
