import React, { VFC, useMemo, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { makeStyles, createStyles } from '@mui/styles';
import Joi from '../../joi.setup';

import { ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';
import Header from '../../components/common/Header';
import FormSignature from '../../components/common/FormSignature';
import FormButton from '../../components/common/FormButton';
import InputWrapper from '../../components/common/InputWrapper';
import loginUser from '../../store/actions/authorizeUser/login';
import { selectUserState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formWrapper: {
    textAlign: 'center',
    marginTop: theme.spacing(12),
  },
  errorMessage: {
    color: 'red',
  },
}));

enum InputFieldNames {
  EMAIL = 'email',
  PASSWORD = 'password',
}

interface FormData {
  [InputFieldNames.EMAIL]: string
  [InputFieldNames.PASSWORD]: string
}

const LogIn: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error } = useSelector(selectUserState);
  const classes = useStyles();

  const submitHandler = useCallback((data: FormData): void => {
    dispatch(loginUser({ ...data }));
  }, []);

  const validationSchema = useMemo(() => Joi.object({
    [InputFieldNames.EMAIL]: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required()
      .messages({
        'string.empty': `${t('signup.login.emailForResetPage.input.emailRequired')}`,
        'string.email': `${t('signup.login.emailForResetPage.input.emailNotValid')}`,
      }),

    [InputFieldNames.PASSWORD]: Joi.string()
      .min(6)
      .max(15)
      .required()
      .messages({
        'string.min': `${t('signup.login.resetPassword.input.passwordShort')}`,
        'string.max': `${t('signup.login.resetPassword.input.passwordLong')}`,
        'string.empty': `${t('signup.login.resetPassword.input.passwordRequired')}`,
      }),
  }), []);

  const { handleSubmit, formState, control } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      [InputFieldNames.EMAIL]: '',
      [InputFieldNames.PASSWORD]: '',
    },
  });

  return (
    <Grid>
      <Header />
      <Container component="main" maxWidth="xs">
        <Grid
          container
          justifyContent="center"
        >
          <Grid
            component="form"
            onSubmit={handleSubmit(submitHandler)}
            noValidate
            className={classes.formWrapper}
          >
            <Typography component="h1" variant="h5">
              {t('login.title.authorization')}
            </Typography>
            <InputWrapper
              name={InputFieldNames.EMAIL}
              control={control}
              error={!!formState.errors[InputFieldNames.EMAIL]?.message}
              helperText={formState.errors[InputFieldNames.EMAIL]?.message}
              label={t('signup.login.emailForResetPage.input.email')}
              margin="normal"
              required
              fullWidth
              variant="outlined"
            />
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
            <Typography>
              {error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error}
            </Typography>
            <FormButton text={t('login.button.logIn')} />
          </Grid>
          <FormSignature signatureText={t('login.signature.forgotPassword')} signatureLink={t('login.signature.reset')} linkRoute={ROUTE_PAGES.resetPasswordEmail} />
          <FormSignature signatureText={t('login.signature.notRegistered')} signatureLink={t('login.signature.signUp')} linkRoute={ROUTE_PAGES.signup} />
        </Grid>
      </Container>
    </Grid>
  );
};

export default LogIn;
