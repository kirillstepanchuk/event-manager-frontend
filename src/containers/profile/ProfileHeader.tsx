import {
  Avatar, Button, Grid, LinearProgress, Tab, Tabs, Theme, Typography,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useCallback, useState, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Inventory2 from '@mui/icons-material/Inventory2';
import { useTranslation } from 'react-i18next';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

import {
  UNDEFINED_ERROR, ROUTE_PAGES, PROFILE_EVENTS_TYPES,
} from '../../constants';
import { selectUserState } from '../../store/selectors/selectors';
import loadProfileEventsData from '../../store/actions/loadEventsData/loadProfileEvents';

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
    [theme.breakpoints.down('md')]: {
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

interface ComponentProps {
  open: () => void
}

const ProfileHeader: VFC<ComponentProps> = ({ open }) => {
  const { data, error } = useSelector(selectUserState);
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = useState<number>();

  const getProfileEvents = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      dispatch(loadProfileEventsData(PROFILE_EVENTS_TYPES.organized));
    }
  }, []);

  return (
    <Grid>
      {data
        ? (
          <Grid>
            <Grid container>
              <Grid lg={9} md={8}>
                <Grid container>
                  <Avatar className={classes.avatar}>
                    <Typography variant="h2">
                      {data?.firstName.split('')[0]}
                    </Typography>
                  </Avatar>
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
                        <Typography variant="h5" className={classes.email}>
                          {data?.email}
                        </Typography>
                      </Grid>
                      <Grid className={classes.userDescription}>
                        <Typography variant="h6">
                          {data?.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid lg={3} md={4}>
                <Grid container direction="column" alignItems="end" justifyContent="space-between" className={classes.buttons}>
                  <Link to={ROUTE_PAGES.editProfile} className={classes.controlLink}>
                    <Button
                      variant="outlined"
                      className={classes.button}
                    >
                      <Typography variant="h6">
                        {t('profile.editButton.editProfile')}
                      </Typography>
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={open}
                  >
                    <Typography variant="h6">
                      {t('profile.categoriesButton.selectCategories')}
                    </Typography>
                  </Button>
                  <Link to={ROUTE_PAGES.createEvent} className={classes.controlLink}>
                    <Button
                      variant="outlined"
                      className={classes.button}
                    >
                      <Typography variant="h6">
                        {t('profile.profileControls.createEvent')}
                      </Typography>
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

export default ProfileHeader;
