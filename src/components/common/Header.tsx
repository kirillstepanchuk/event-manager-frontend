import React, { useCallback, VFC } from 'react';
import {
  AppBar, Typography, Button, Toolbar, Grid, Theme, Avatar, Select, MenuItem,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

import {
  LANG_CODES, ROUTE_PAGES, LANGS,
} from '../../constants';
import logoutUser from '../../store/actions/authorizeUser/logoutUser';
import { selectUserState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  logo: {
    fontSize: theme.typography.fontSize * 3,
    marginTop: theme.spacing(1.05),
    marginLeft: theme.spacing(3),
  },
  profile: {
    display: 'flex',
    marginRight: theme.spacing(3),
  },
  profileLink: {
    textDecoration: 'none',
    color: theme.palette.secondary.light,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  userName: {
    paddingTop: theme.spacing(1.2),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  categories: {
    textTransform: 'capitalize',
  },
  buttonsGrid: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  headerLink: {
    textDecoration: 'none',
    color: theme.palette.secondary.light,
  },
  languageButton: {
    color: theme.palette.secondary.light,
    '&:after': {
      borderBottomColor: theme.palette.secondary.light,
    },
    '&:before': {
      borderBottomColor: theme.palette.secondary.light,
    },
    '&:focus': {
      borderBottomColor: theme.palette.secondary.light,
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.secondary.light,
    },
  },
  headerAdminButton: {
    textTransform: 'initial',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.fontSize,
    },
  },
}));

const Header: VFC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { data } = useSelector(selectUserState);
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(logoutUser());
  }, []);

  const switchLanguage = (evt: { target: { value: string | undefined; }; }): void => {
    i18next.changeLanguage(evt.target.value);
    window.location.reload();
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
    >
      <AppBar position="relative">
        {data?.firstName ? (
          <Toolbar>
            <Grid item xs={10.5}>
              <Link to={ROUTE_PAGES.main} className={classes.headerLink}>
                <TheaterComedyIcon className={classes.logo} />
              </Link>
            </Grid>
            {data.role === 'super-admin'
              ? (
                <Grid item lg={1} md={1.5}>
                  <Link to={ROUTE_PAGES.clients} className={classes.headerLink}>
                    <Button
                      color="inherit"
                      variant="text"
                      className={classes.headerAdminButton}
                    >
                      Clients
                    </Button>
                  </Link>
                </Grid>
              ) : (
                <>
                </>
              )}
            {data.role === 'admin' || data.role === 'super-admin'
              ? (
                <Grid item lg={1.5} md={2.5}>
                  <Link to={ROUTE_PAGES.pendingEvents} className={classes.headerLink}>
                    <Button
                      color="inherit"
                      variant="text"
                      className={classes.headerAdminButton}
                    >
                      Requests
                    </Button>
                  </Link>
                </Grid>
              ) : (
                <>
                </>
              )}
            <Grid className={classes.profile}>
              <Link to={ROUTE_PAGES.profile} className={classes.profileLink}>
                <Grid>
                  <Typography className={classes.userName}>
                    {data.firstName}
                  </Typography>
                </Grid>
              </Link>
              <Link to={ROUTE_PAGES.profile} className={classes.profileLink}>
                <Avatar>{data.firstName.split('')[0]}</Avatar>
              </Link>
            </Grid>
            <Select
              variant="standard"
              className={classes.languageButton}
              defaultValue={t('lang')}
              label="Language"
              onChange={switchLanguage}
            >
              <MenuItem value={LANGS.en}>{LANG_CODES.en}</MenuItem>
              <MenuItem value={LANGS.de}>{LANG_CODES.de}</MenuItem>
            </Select>
            <Button variant="text" color="inherit" onClick={logout}>
              <LogoutIcon />
            </Button>
          </Toolbar>
        ) : (
          <Toolbar>
            <Grid item lg={9} md={8} sm={6} xs={8}>
              <Link to={ROUTE_PAGES.main} className={classes.headerLink}>
                <TheaterComedyIcon className={classes.logo} />
              </Link>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={4}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className={classes.buttonsGrid}
              >
                <Link to={ROUTE_PAGES.login} className={classes.headerLink}>
                  <Button
                    color="inherit"
                    variant="text"
                  >
                    {t('login.button.logIn')}
                  </Button>
                </Link>
                <Link to={ROUTE_PAGES.signup} className={classes.headerLink}>
                  <Button
                    color="inherit"
                    variant="text"
                  >
                    {t('signup.button.signUp')}
                  </Button>
                </Link>
                <Select
                  variant="standard"
                  className={classes.languageButton}
                  defaultValue={t('lang')}
                  label="Language"
                  onChange={switchLanguage}
                >
                  <MenuItem value={LANGS.en}>{LANG_CODES.en}</MenuItem>
                  <MenuItem value={LANGS.de}>{LANG_CODES.de}</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Toolbar>
        )}
      </AppBar>
    </Grid>
  );
};

export default Header;
