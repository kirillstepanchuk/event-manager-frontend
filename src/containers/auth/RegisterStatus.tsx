import React, { useEffect, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Grid, Button, Typography, Theme, useTheme, LinearProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useLocation } from 'react-router';

import Header from '../../components/common/Header';
import { ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import confirmUser from '../../store/actions/authorizeUser/confirmUser';
import { selectUserState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  message: {
    marginTop: theme.spacing(12),
  },
  icon: {
    width: '50px',
    height: '50px',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
  },
}));

const CheckEmail: VFC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles(theme);
  const location = useLocation();
  const { token } = queryString.parse(location.search);
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectUserState);

  useEffect(() => {
    dispatch(confirmUser(token as string));
  }, []);

  return (
    <Grid>
      <Header />
      {loading
        ? (
          <LinearProgress />
        ) : (
          <Grid>
            {error
              ? (
                <Grid container direction="column" alignItems="center" textAlign="center" className={classes.message}>
                  <Grid>
                    <Typography variant="h4" className={classes.title}>
                      {error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid container direction="column" alignItems="center" textAlign="center" className={classes.message}>
                  <Grid>
                    <CheckCircleIcon className={classes.icon} />
                  </Grid>
                  <Grid>
                    <Typography variant="h4" className={classes.title}>
                      {t('registerStatus.message')}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="h5">
                      {t('registerStatus.title.emailHasBeenConfirmed')}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Grid container direction="column" justifyContent="center">
                      <Grid>
                        <Typography variant="h5">
                          {`${t('registerStatus.subtitle.canAuthorize')}.`}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Link to={ROUTE_PAGES.login}>
                          <Button variant="text" className={classes.link}>
                            {t('registerStatus.link.goToLogin')}
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
          </Grid>
        )}
    </Grid>
  );
};

export default CheckEmail;
