import React, { VFC, useMemo, useCallback } from 'react';
import {
  Button, Grid, Typography, Theme, Paper,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { createStyles, makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';

import Joi from '../../joi.setup';
import { PHONE_REG_EXP, UNDEFINED_ERROR } from '../../constants';
import InputWrapper from '../../components/common/InputWrapper';
import subscribeToNotifications from '../../store/actions/sendRequest/subscribeToNotifications';
import { selectApiState } from '../../store/selectors/selectors';

interface PhoneData {
  phone: string
}

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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  buttons: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
  },
  button: {
    color: theme.palette.primary.main,
  },
  icon: {
    width: '40px',
    height: '40px',
    marginTop: theme.spacing(8),
    color: theme.palette.primary.main,
  },
}));

enum InputFieldNames {
  PHONE = 'phone',
}

interface ComponentProps {
  close: () => void
}

const NotificationsModal: VFC<ComponentProps> = ({ close }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, error } = useSelector(selectApiState);

  const submitHandler = useCallback((formData: PhoneData) => {
    dispatch(subscribeToNotifications({ ...formData }));
  }, []);

  const validationSchema = useMemo(() => Joi.object({
    phone: Joi.string()
      .pattern(PHONE_REG_EXP)
      .required()
      .messages({
        'string.empty': `${t('notificationsModal.input.phoneRequired')}`,
        'string.pattern.base': `${t('notificationsModal.input.phoneInvalid')}`,
      }),
  }), []);

  const { control, handleSubmit, formState: { errors } } = useForm<PhoneData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      phone: '',
    },
  });

  return (
    <Grid container justifyContent="center" className={classes.modal}>
      <Grid item lg={4} md={5} sm={7} xs={10}>
        <Paper
          className={classes.formWrapper}
          elevation={12}
        >
          <NotificationsActiveIcon className={classes.icon} />
          <Grid container justifyContent="center">
            <Grid item xs={11}>
              <Typography
                variant="h5"
                className={classes.formTitle}
              >
                {t('notificationsModal.title.notifications')}
              </Typography>
            </Grid>
          </Grid>
          <Grid component="form" onSubmit={handleSubmit(submitHandler)} noValidate container justifyContent="center" direction="column">
            <Grid item xs={12}>
              <InputWrapper
                name={InputFieldNames.PHONE}
                control={control}
                error={!!errors.phone?.message}
                helperText={errors.phone?.message}
                variant="outlined"
                label={t('notificationsModal.input.phone')}
              />
            </Grid>
            <Grid
              className={classes.buttons}
              container
              justifyContent="space-around"
            >
              <Button
                variant="text"
                type="submit"
                className={classes.button}
              >
                {t('notificationsModal.button.yes')}
              </Button>
              <Button
                variant="text"
                type="button"
                className={classes.button}
                onClick={close}
              >
                {t('notificationsModal.button.nextTime')}
              </Button>
            </Grid>
            <Typography>
              {(error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error) || data}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NotificationsModal;
