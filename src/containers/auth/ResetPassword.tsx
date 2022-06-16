import React, {
  VFC, useCallback, useMemo,
} from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import {
  Grid, Typography, Container, Theme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Joi from '../../joi.setup';
import Header from '../../components/common/Header';
import InputWrapper from '../../components/common/InputWrapper';
import FormButton from '../../components/common/FormButton';
import resetPassword from '../../store/actions/sendRequest/resetPassword';
import { UNDEFINED_ERROR } from '../../constants';
import { selectApiState } from '../../store/selectors/selectors';

enum InputFieldNames {
  PASSWORD = 'password',
  REPEATED_PASSWORD = 'repeatedPassword',
}

interface FormData {
  [InputFieldNames.PASSWORD]: string
  [InputFieldNames.REPEATED_PASSWORD]: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  formWrapper: {
    textAlign: 'center',
    marginTop: theme.spacing(12),
  },
}));

const ResetPassword: VFC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, error } = useSelector(selectApiState);

  const submitHandler = useCallback((formData: FormData) => {
    dispatch(resetPassword({ ...formData, userId: Number(id) }));
  }, []);

  const validationSchema = useMemo(() => Joi.object({
    [InputFieldNames.PASSWORD]: Joi.string()
      .min(6)
      .max(15)
      .required()
      .messages({
        'string.min': `${t('signup.login.resetPassword.input.passwordShort')}`,
        'string.max': `${t('signup.login.resetPassword.input.passwordLong')}`,
        'string.empty': `${t('signup.login.resetPassword.input.passwordRequired')}`,
      }),

    [InputFieldNames.REPEATED_PASSWORD]: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': `${t('signup.resetPassword.input.repeatedPasswordRequired')}`,
      }),
  }), []);

  const { handleSubmit, formState, control } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      [InputFieldNames.PASSWORD]: '',
      [InputFieldNames.REPEATED_PASSWORD]: '',
    },
  });

  return (
    <Grid>
      <Header />
      <Container component="main" maxWidth="xs">
        <Grid component="form" container direction="column" onSubmit={handleSubmit(submitHandler)} noValidate className={classes.formWrapper}>
          <Typography component="h1" variant="h5">
            {t('resetPassword.title.newPassword')}
          </Typography>
          <InputWrapper
            name={InputFieldNames.PASSWORD}
            control={control}
            error={!!formState.errors[InputFieldNames.PASSWORD]?.message}
            helperText={formState.errors[InputFieldNames.PASSWORD]?.message}
            label={t('signup.login.resetPassword.input.password')}
            margin="normal"
            required
            fullWidth
            variant="outlined"
            type="password"
          />
          <InputWrapper
            name={InputFieldNames.REPEATED_PASSWORD}
            control={control}
            error={!!formState.errors[InputFieldNames.REPEATED_PASSWORD]?.message}
            helperText={formState.errors[InputFieldNames.REPEATED_PASSWORD]?.message}
            label={t('signup.resetPassword.input.repeatedPassword')}
            margin="normal"
            required
            fullWidth
            variant="outlined"
            type="password"
          />
          <Typography>
            {(error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error) || data}
          </Typography>
          <FormButton text={t('resetPassword.button.confirm')} />
        </Grid>
      </Container>
    </Grid>
  );
};

export default ResetPassword;
