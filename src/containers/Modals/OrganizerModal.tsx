import React, {
  FC,
} from 'react';
import {
  Grid,
  Theme,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { selectEventState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  formWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: theme.spacing(28),
  },
  formTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  buttons: {
    marginBottom: theme.spacing(6),
  },
  button: {
    color: theme.palette.primary.main,
  },
  select: {
    background: theme.palette.secondary.light,
    '&:after': {
      background: theme.palette.secondary.light,
    },
    '&:hover': {
      background: theme.palette.secondary.light,
    },
    '&:focus': {
      background: theme.palette.secondary.light,
    },
  },
}));

interface ComponentProps {
  close: () => void
}

const OgranizerModal: FC<ComponentProps> = ({ close }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { data } = useSelector(selectEventState);

  return (
    <Grid container justifyContent="center" className={classes.modal}>
      <Grid item lg={4} md={6} sm={7} xs={10}>
        <Paper
          className={classes.formWrapper}
          elevation={12}
        >
          <Typography
            variant="h5"
            className={classes.formTitle}
          >
            {`${t('organizerModal.title.contactPerson')}`}
          </Typography>
          <Typography variant="h6">
            {`${t('organizerModal.subtitle.name')}: ${data?.contactPerson}`}
          </Typography>
          <Typography variant="h6">
            {`${t('organizerModal.subtitle.contact')}: ${data?.contactOption}`}
          </Typography>
          <Grid
            className={classes.buttons}
            container
            justifyContent="space-around"
          >
            <Button
              variant="text"
              type="button"
              className={classes.button}
              onClick={close}
            >
              {t('organizerModal.button.close')}
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OgranizerModal;
