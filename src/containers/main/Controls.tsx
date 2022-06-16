import {
  Button, Grid, Theme, useTheme,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, {
  useEffect, VFC,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/common/Header';
import loadEventsData from '../../store/actions/loadEventsData/loadEventsData';
import SearchControl from '../../components/common/SearchControl';
import { ROUTE_PAGES } from '../../constants';
import Container from '../../components/common/Container';

const useStyles = makeStyles((theme: Theme) => createStyles({
  buttonGrid: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-around',
    },
  },
  mapLink: {
    textDecoration: 'none',
  },
}));

const Controls: VFC = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEventsData());
  }, []);

  return (
    <Grid
      container
      direction="column"
    >
      <Header />
      <Container>
        <SearchControl controlTitle={t('mainPage.title.upcomingEvents')} page={1} />
        <Grid container className={classes.buttonGrid}>
          <Grid>
            <Link to={`${ROUTE_PAGES.map}`} className={classes.mapLink}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                {t('mainPage.button.showOnMap')}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Controls;
