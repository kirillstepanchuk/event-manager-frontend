import React, {
  useCallback, useMemo, VFC,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid, Container, Typography, Theme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles } from '@mui/styles';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';

import Joi from '../../joi.setup';
import Header from '../../components/common/Header';
import InputWrapper from '../../components/common/InputWrapper';
import FormButton from '../../components/common/FormButton';
import sendEmailForPasswordReset from '../../store/actions/sendRequest/sendEmailForPasswordReset';
import { UNDEFINED_ERROR } from '../../constants';
import { selectApiState } from '../../store/selectors/selectors';

enum InputFieldNames {
  EMAIL = 'email',
}

interface FormData {
  [InputFieldNames.EMAIL]: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  formWrapper: {
    textAlign: 'center',
    marginTop: theme.spacing(12),
  },
}));

const EmailForPasswordReset: VFC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, error } = useSelector(selectApiState);

  const submitHandler = useCallback((formData: FormData): void => {
    dispatch(sendEmailForPasswordReset({ ...formData }));
  }, []);

  const validationSchema = useMemo(() => Joi.object({
    [InputFieldNames.EMAIL]: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.empty': `${t('signup.login.emailForResetPage.input.emailRequired')}`,
        'string.email': `${t('signup.login.emailForResetPage.input.emailNotValid')}`,
      }),
  }), []);

  const { handleSubmit, formState, control } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      [InputFieldNames.EMAIL]: '',
    },
  });

  return (
    <Grid>
      <Header />
      <Container component="main" maxWidth="xs">
        <Grid component="form" container direction="column" onSubmit={handleSubmit(submitHandler)} noValidate className={classes.formWrapper}>
          <Typography component="h1" variant="h5">
            {t('emailForResetPage.title.emailForReset')}
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
          <Typography>
            {(error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error) || data}
          </Typography>
          <FormButton text={t('emailForResetPage.button.send')} />
        </Grid>
      </Container>
    </Grid>
  );
};

export default EmailForPasswordReset;
