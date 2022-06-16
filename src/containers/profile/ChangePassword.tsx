import { joiResolver } from '@hookform/resolvers/joi';
import {
  CircularProgress,
  Container,
  Grid, LinearProgress, Theme, Typography,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, {
  useCallback, useMemo, useState, VFC,
} from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { fetchChangePassword } from '../../api/user.api';

import Joi from '../../joi.setup';
import FormButton from '../../components/common/FormButton';
import Header from '../../components/common/Header';
import InputWrapper from '../../components/common/InputWrapper';
import { selectUserState } from '../../store/selectors/selectors';
import handleError from '../../utils/errorHandler';

const useStyles = makeStyles((theme: Theme) => createStyles({
  loading: {
    marginTop: theme.spacing(12),
  },
  formWrapper: {
    textAlign: 'center',
    marginTop: theme.spacing(12),
  },
}));

enum InputFieldNames {
  CURRENT_PASSWORD = 'currentPassword',
  NEW_PASSWORD = 'newPassword',
  REPEATED_NEW_PASSWORD = 'repeatedNewPassword',
}

interface FormData {
  currentPassword: string,
  newPassword: string,
  repeatedNewPassword: string,
}

const ChangePassword: VFC = () => {
  const classes = useStyles();
  const { data } = useSelector(selectUserState);
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  const submitHandler = useCallback(async (formData: FormData) => {
    setLoading(true);
    try {
      const fetched = await fetchChangePassword(formData);
      setResult(fetched.data.message);
    } catch (e) {
      setResult(handleError(e));
    }
    setLoading(false);
  }, []);

  const validationSchema = useMemo(() => Joi.object({
    currentPassword: Joi.string()
      .min(6)
      .max(15)
      .required()
      .messages({
        'string.min': `${t('signup.login.resetPassword.input.passwordShort')}`,
        'string.max': `${t('signup.login.resetPassword.input.passwordLong')}`,
        'string.empty': `${t('changePassword.input.currentPasswordRequired')}`,
      }),

    newPassword: Joi.string()
      .min(6)
      .max(15)
      .required()
      .messages({
        'string.min': `${t('signup.login.resetPassword.input.passwordShort')}`,
        'string.max': `${t('signup.login.resetPassword.input.passwordLong')}`,
        'string.empty': `${t('changePassword.input.newPasswordRequired')}`,
      }),

    repeatedNewPassword: Joi.any()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.only': `${t('signup.resetPassword.input.repeatedPasswordRequired')}`,
      }),
  }), []);

  const { handleSubmit, control, formState } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatedNewPassword: '',
    },
  });

  return (
    <Grid>
      {data
        ? (
          <Grid>
            <Header />
            <Container
              component="main"
              maxWidth="xs"
            >
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
                    {t('changePassword.title.changePassword')}
                  </Typography>
                  <InputWrapper
                    name={InputFieldNames.CURRENT_PASSWORD}
                    control={control}
                    error={!!formState.errors.currentPassword?.message}
                    helperText={formState.errors.currentPassword?.message}
                    label={t('changePassword.label.currentPassword')}
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                    type="password"
                  />
                  <InputWrapper
                    name={InputFieldNames.NEW_PASSWORD}
                    control={control}
                    error={!!formState.errors.newPassword?.message}
                    helperText={formState.errors.newPassword?.message}
                    label={t('changePassword.label.newPassword')}
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                    type="password"
                  />
                  <InputWrapper
                    name={InputFieldNames.REPEATED_NEW_PASSWORD}
                    control={control}
                    error={!!formState.errors.repeatedNewPassword?.message}
                    helperText={formState.errors.repeatedNewPassword?.message}
                    label={t('changePassword.label.repeatedNewPassword')}
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                    type="password"
                  />
                  <FormButton text={t('changePassword.button.confirm')} />
                  {loading
                    ? (
                      <Typography>
                        <CircularProgress />
                      </Typography>
                    ) : (
                      <Typography>
                        {result}
                      </Typography>
                    )}
                </Grid>
              </Grid>
            </Container>
          </Grid>
        ) : (
          <Grid className={classes.loading}>
            <LinearProgress />
          </Grid>
        )}
    </Grid>
  );
};

export default ChangePassword;
