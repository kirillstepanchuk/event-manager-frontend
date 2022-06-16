import {
  Avatar, Button, Grid, LinearProgress, Theme, Typography,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import React, {
  useCallback, useEffect, useMemo, VFC,
} from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Joi from '../../joi.setup';

import Header from '../../components/common/Header';
import InputWrapper from '../../components/common/InputWrapper';
import { NAME_REG_EXP, ROUTE_PAGES } from '../../constants';
import { selectUserState } from '../../store/selectors/selectors';
import editUserData from '../../store/actions/getUser/editUser';
import Container from '../../components/common/Container';

const useStyles = makeStyles((theme: Theme) => createStyles({
  loading: {
    marginTop: theme.spacing(12),
  },
  avatar: {
    width: '200px',
    height: '200px',
    backgroundColor: theme.palette.primary.light,
    marginRight: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      width: '135px',
      height: '135px',
      marginBottom: theme.spacing(3),
    },
  },
  buttons: {
    height: '100%',
    [theme.breakpoints.down('xl')]: {
      marginTop: theme.spacing(6),
      alignItems: 'start',
    },
  },
  button: {
    textTransform: 'initial',
  },
}));

interface FormData {
  firstName: string
  lastName: string
  description: string
}

enum InputFieldNames {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  DESCRIPTION = 'description',
}

const EditProfile: VFC = () => {
  const classes = useStyles();
  const { data } = useSelector(selectUserState);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const submitHandler = useCallback((formData: FormData) => {
    dispatch(editUserData(formData));
  }, []);

  const validationSchema = useMemo(() => Joi.object({
    firstName: Joi.string()
      .min(3)
      .trim()
      .required()
      .pattern(NAME_REG_EXP)
      .messages({
        'string.empty': `${t('signup.input.firstNameRequired')}`,
        'string.min': `${t('signup.input.firstNameLength')}`,
        'string.pattern.base': `${t('signup.input.firstNameNotValid')}`,
      }),

    lastName: Joi.string()
      .min(3)
      .trim()
      .required()
      .pattern(NAME_REG_EXP)
      .messages({
        'string.empty': `${t('signup.input.lastNameRequired')}`,
        'string.min': `${t('signup.input.lastNameLength')}`,
        'string.pattern.base': `${t('signup.input.lastNameNotValid')}`,
      }),

    description: Joi.string()
      .trim()
      .allow(''),
  }), []);

  const {
    handleSubmit, control, formState, reset,
  } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      description: data?.description,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        description: data.description,
      });
    }
  }, [data]);

  return (
    <Grid>
      {data
        ? (
          <Grid>
            <Header />
            <Container>
              <Grid container>
                <Avatar className={classes.avatar}>
                  <Typography variant="h1">
                    {data?.firstName.split('')[0]}
                  </Typography>
                </Avatar>
                <Grid
                  component="form"
                  onSubmit={handleSubmit(submitHandler)}
                  container
                  lg={9}
                  md={12}
                  justifyContent="space-between"
                >
                  <Grid container direction="column" lg={6} md={7} sm={9} xs={12} justifyContent="space-between">
                    <InputWrapper
                      name={InputFieldNames.FIRST_NAME}
                      control={control}
                      error={!!formState.errors.firstName?.message}
                      helperText={formState.errors.firstName?.message}
                      label={t('signup.input.firstName')}
                      variant="standard"
                    />
                    <InputWrapper
                      name={InputFieldNames.LAST_NAME}
                      control={control}
                      error={!!formState.errors.lastName?.message}
                      helperText={formState.errors.lastName?.message}
                      label={t('signup.input.lastName')}
                      variant="standard"
                    />
                    <InputWrapper
                      name={InputFieldNames.DESCRIPTION}
                      control={control}
                      error={!!formState.errors.description?.message}
                      helperText={formState.errors.description?.message}
                      label={t('editProfile.description.label')}
                      variant="standard"
                    />
                  </Grid>
                  <Grid>
                    <Grid container direction="column" alignItems="end" justifyContent="space-between" className={classes.buttons}>
                      <Button
                        variant="outlined"
                        className={classes.button}
                        type="submit"
                      >
                        <Typography variant="h6">
                          {t('editProfile.editEvent.button.saveChanges')}
                        </Typography>
                      </Button>
                      <Link to={ROUTE_PAGES.changePassword}>
                        <Button
                          variant="outlined"
                          className={classes.button}
                        >
                          <Typography variant="h6">
                            {t('editProfile.button.changePassword')}
                          </Typography>
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
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

export default EditProfile;
