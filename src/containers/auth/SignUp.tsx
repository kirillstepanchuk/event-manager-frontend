import React, { VFC, useMemo, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import {
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import Joi from '../../joi.setup';

import { ROUTE_PAGES, UNDEFINED_ERROR, NAME_REG_EXP } from '../../constants';
import Header from '../../components/common/Header';
import FormSignature from '../../components/common/FormSignature';
import FormButton from '../../components/common/FormButton';
import InputWrapper from '../../components/common/InputWrapper';
import signupUser from '../../store/actions/authorizeUser/signup';
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
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PASSWORD = 'password',
  REPEATED_PASSWORD = 'repeatedPassword',
}

interface FormData {
  [InputFieldNames.EMAIL]: string
  [InputFieldNames.FIRST_NAME]: string
  [InputFieldNames.LAST_NAME]: string
  [InputFieldNames.PASSWORD]: string
  [InputFieldNames.REPEATED_PASSWORD]: string
}

const SignUp: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error } = useSelector(selectUserState);
  const classes = useStyles();

  const submitHandler = useCallback((data: FormData): void => {
    dispatch(signupUser(data));
  }, []);

  const validationSchema = useMemo(() => Joi.object({
    [InputFieldNames.EMAIL]: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.empty': `${t('signup.login.emailForResetPage.input.emailRequired')}`,
        'string.email': `${t('signup.login.emailForResetPage.input.emailNotValid')}`,
      }),

    [InputFieldNames.FIRST_NAME]: Joi.string()
      .min(3)
      .trim()
      .required()
      .pattern(NAME_REG_EXP)
      .messages({
        'string.empty': `${t('signup.input.firstNameRequired')}`,
        'string.min': `${t('signup.input.firstNameLength')}`,
        'string.pattern.base': `${t('signup.input.firstNameNotValid')}`,
      }),

    [InputFieldNames.LAST_NAME]: Joi.string()
      .min(3)
      .trim()
      .required()
      .pattern(NAME_REG_EXP)
      .messages({
        'string.empty': `${t('signup.input.lastNameRequired')}`,
        'string.min': `${t('signup.input.lastNameLength')}`,
        'string.pattern.base': `${t('signup.input.lastNameNotValid')}`,
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
      [InputFieldNames.EMAIL]: '',
      [InputFieldNames.FIRST_NAME]: '',
      [InputFieldNames.LAST_NAME]: '',
      [InputFieldNames.PASSWORD]: '',
      [InputFieldNames.REPEATED_PASSWORD]: '',
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
              {t('signup.title.registration')}
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
              name={InputFieldNames.FIRST_NAME}
              control={control}
              error={!!formState.errors[InputFieldNames.FIRST_NAME]?.message}
              helperText={formState.errors[InputFieldNames.FIRST_NAME]?.message}
              label={t('signup.input.firstName')}
              margin="normal"
              required
              fullWidth
              variant="outlined"
            />
            <InputWrapper
              name={InputFieldNames.LAST_NAME}
              control={control}
              error={!!formState.errors[InputFieldNames.LAST_NAME]?.message}
              helperText={formState.errors[InputFieldNames.LAST_NAME]?.message}
              label={t('signup.input.lastName')}
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
              {error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error}
            </Typography>
            <FormButton text={t('signup.button.signUp')} />
          </Grid>
          <FormSignature signatureText={t('signup.signature.alreadyRegistered')} signatureLink={t('signup.signature.logIn')} linkRoute={ROUTE_PAGES.login} />
        </Grid>
      </Container>
    </Grid>
  );
};

export default SignUp;
