import React, { VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles } from '@mui/styles';
import {
  Grid, Theme, Typography, useTheme,
} from '@mui/material';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

import Header from '../../components/common/Header';

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
  typography: {
    marginBottom: theme.spacing(2),
  },
}));

const CheckEmail: VFC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Grid>
      <Header />
      <Grid container textAlign="center" direction="column" className={classes.message}>
        <Grid>
          <Grid>
            <MarkEmailUnreadIcon className={classes.icon} />
          </Grid>
          <Typography variant="h4" className={classes.title}>
            {t('checkEmail.title.success')}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h5" className={classes.typography}>
            {t('checkEmail.message.confirmAccount')}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h5">
            {t('checkEmail.message.emailLink')}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckEmail;
