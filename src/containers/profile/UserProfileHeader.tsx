import {
  Avatar, Button, Grid, LinearProgress, Tab, Tabs, Theme, Typography, useTheme,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, {
  useCallback, useEffect, VFC, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Inventory2 from '@mui/icons-material/Inventory2';
import { useTranslation } from 'react-i18next';
import BookIcon from '@mui/icons-material/Book';
import { Link, useParams } from 'react-router-dom';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

import { ROUTE_PAGES, UNDEFINED_ERROR, PROFILE_EVENTS_TYPES } from '../../constants';
import getClient from '../../store/actions/clientData/getClient';
import loadClientEvents from '../../store/actions/loadEventsData/loadClientEvents';
import { selectClientState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  avatar: {
    width: '200px',
    height: '200px',
    backgroundColor: theme.palette.primary.light,
    marginRight: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      width: '135px',
      height: '135px',
      marginBottom: theme.spacing(3),
    },
  },
  email: {
    color: theme.palette.primary.light,
  },
  userDescription: {
    marginTop: theme.spacing(5),
  },
  buttons: {
    height: '100%',
    [theme.breakpoints.down('xl')]: {
      marginTop: theme.spacing(6),
      alignItems: 'start',
    },
  },
  button: {
    textTransform: 'initial',
  },
  profileControls: {
    marginTop: theme.spacing(12),
  },
  controlLink: {
    textDecoration: 'none',
  },
  controlText: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  profileTab: {
    color: theme.palette.primary.main,
    textTransform: 'initial',
  },
}));

const UserProfileHeader: VFC = () => {
  const { data, error } = useSelector(selectClientState);
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { clientId } = useParams<{ clientId: string }>();
  const [value, setValue] = useState<number>();

  useEffect(() => {
    dispatch(getClient(clientId));
  }, []);

  const getProfileEvents = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      dispatch(loadClientEvents({ eventsType: PROFILE_EVENTS_TYPES.organized, id: clientId }));
    }
  }, []);

  return (
    <Grid>
      {data
        ? (
          <Grid>
            <Grid container>
              <Grid lg={9}>
                <Grid container>
                  <Avatar className={classes.avatar}>{data?.firstName.split('')[0]}</Avatar>
                  <Grid>
                    <Grid container direction="column">
                      <Grid>
                        <Typography variant="h5">
                          {data?.firstName}
                          {' '}
                          {data?.lastName}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography className={classes.email} variant="h5">
                          {data?.email}
                        </Typography>
                      </Grid>
                      <Grid className={classes.userDescription}>
                        <Typography variant="h6">
                          {data?.description}
                        </Typography>
                        <Typography variant="subtitle1">
                          {data.isBlocked ? t('clientProfile.subtitle.blocked') : t('clientProfile.subtitle.notBlocked')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid lg={3} md={5}>
                <Grid container justifyContent="end">
                  <Link to={`${ROUTE_PAGES.editClient}/${clientId}`}>
                    <Button
                      variant="outlined"
                      className={classes.button}
                    >
                      {t('profile.editButton.editProfile')}
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.profileControls}>
              <Grid container justifyContent="center">
                <Tabs value={value} onChange={getProfileEvents} variant="scrollable" centered>
                  <Tab icon={<Inventory2 />} label={t('profile.profileControls.organizedEvents')} className={classes.profileTab} />
                  <Tab icon={<BookIcon />} label={t('profile.profileControls.bookedEvents')} className={classes.profileTab} />
                  <Tab icon={<HistoryToggleOffIcon />} label={t('profile.profileControls.eventsHistory')} className={classes.profileTab} />
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid>
            {error
              ? (
                <Grid item xs={12} textAlign="center">
                  <Typography>
                    {(error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error) || data}
                  </Typography>
                </Grid>
              )
              : (
                <LinearProgress />
              )}
          </Grid>
        )}
    </Grid>
  );
};

export default UserProfileHeader;
