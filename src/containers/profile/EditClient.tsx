import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress, MenuItem, Select, Snackbar, Theme, Typography,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import React, {
  useCallback, useEffect, useMemo, VFC,
} from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Joi from '../../joi.setup';

import Header from '../../components/common/Header';
import InputWrapper from '../../components/common/InputWrapper';
import { NAME_REG_EXP } from '../../constants';
import getClient from '../../store/actions/clientData/getClient';
import editClient from '../../store/actions/clientData/editClient';
import blockClient from '../../store/actions/clientData/blockClient';
import Container from '../../components/common/Container';
import closeAlert from '../../store/actions/sendRequest/closeAlert';
import { selectApiState, selectClientState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  avatar: {
    width: '200px',
    height: '200px',
    fontSize: theme.typography.fontSize * 4,
    backgroundColor: theme.palette.primary.light,
    marginRight: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      width: '135px',
      height: '135px',
      marginBottom: theme.spacing(3),
      fontSize: theme.typography.fontSize * 3,
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
  select: {
    marginTop: theme.spacing(2),
  },
  blockButton: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'start',
    },
  },
  closeAlert: {
    color: theme.palette.secondary.light,
  },
}));

interface FormData {
  firstName: string
  lastName: string
  description: string
  role: string
}

enum InputFieldNames {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  DESCRIPTION = 'description',
  ROLE = 'role',
}

const EditProfile: VFC = () => {
  const classes = useStyles();
  const { data } = useSelector(selectClientState);
  const apiReducer = useSelector(selectApiState);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { clientId } = useParams<{ clientId: string }>();

  const submitHandler = useCallback((formData: FormData) => {
    dispatch(editClient({ ...formData, clientId }));
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

    role: Joi.string(),
  }), []);

  const {
    handleSubmit, control, formState, reset,
  } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      description: data?.description,
      role: data?.role,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        description: data.description,
        role: data.role,
      });
    } else {
      dispatch(getClient(clientId));
    }
  }, [data]);

  const blockUser = useCallback(() => {
    dispatch(blockClient(clientId));
  }, []);

  const closeApiAlert = useCallback(() => {
    dispatch(closeAlert());
  }, []);

  return (
    <Grid>
      {data
        ? (
          <Grid>
            <Header />
            <Container>
              <Grid container>
                <Avatar className={classes.avatar}>{data?.firstName.split('')[0]}</Avatar>
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
                    <Controller
                      name={InputFieldNames.ROLE}
                      control={control}
                      render={({ field }) => (
                        <FormControl className={classes.select}>
                          <InputLabel id="category-label">{t('editClient.label.role')}</InputLabel>
                          <Select
                            {...field}
                            variant="outlined"
                            labelId="category-label"
                            label="Category"
                            fullWidth={false}
                            defaultValue={data.role}
                          >
                            <MenuItem value="admin">{t('editClient.select.admin')}</MenuItem>
                            <MenuItem value="super-admin">{t('editClient.select.superAdmin')}</MenuItem>
                            <MenuItem value="customer">{t('editClient.select.customer')}</MenuItem>
                          </Select>
                        </FormControl>
                      )}
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
                      <Grid textAlign="end" className={classes.blockButton}>
                        <Button
                          variant="outlined"
                          className={classes.button}
                          onClick={blockUser}
                        >
                          <Typography variant="h6">
                            {t('editClient.button.block')}
                          </Typography>
                        </Button>
                        <Typography variant="subtitle1">
                          {apiReducer.error || apiReducer.data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        ) : (
          <Container>
            <LinearProgress />
          </Container>
        )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!apiReducer.data || !!apiReducer.error}
        autoHideDuration={6000}
        message={apiReducer.data || apiReducer.error}
        action={(
          <Button onClick={closeApiAlert} className={classes.closeAlert}>
            <CloseIcon />
          </Button>
        )}
      />
    </Grid>
  );
};

export default EditProfile;
