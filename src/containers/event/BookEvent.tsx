import React, {
  useCallback, useEffect, useMemo, useState, VFC,
} from 'react';
import {
  Grid,
  LinearProgress,
  Theme,
  Typography,
  Container,
  Button,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';

import Joi from '../../joi.setup';
import Header from '../../components/common/Header';
import loadEventData from '../../store/actions/loadEventData/loadEventData';
import InputWrapper from '../../components/common/InputWrapper';
import {
  NAME_REG_EXP, ROUTE_PAGES, TICKET_TYPES,
} from '../../constants';
import createPaymentSession from '../../store/actions/sendRequest/createPaymentSession';
import { selectApiState, selectEventState, selectUserState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  loader: {
    marginTop: theme.spacing(6),
  },
  wrapper: {
    marginTop: theme.spacing(6),
  },
  eventInfo: {
    [theme.breakpoints.up('sm')]: {
      alignItems: 'end',
    },
  },
  eventName: {
    textTransform: 'capitalize',
  },
  formWrapper: {
    marginTop: theme.spacing(4),
  },
  inputWrapper: {
    marginTop: theme.spacing(2),
  },
  amountButton: {
    textTransform: 'initial',
  },
}));

enum InputFieldNames {
  AMOUNT_OF_PEOPLE_STANDART = 'amountOfPeopleStandart',
  AMOUNT_OF_PEOPLE_VIP = 'amountOfPeopleVip',
  PEOPLE_INFORMATION = 'peopleInformation',
  PAYMENT_METHOD = 'paymentMethod',
  PERSON_FIRST_NAME = 'firstName',
  PERSON_LAST_NAME = 'lastName',
  AMOUNT_OF_PEOPLE = 'amountOfPeople',
  PERSON_EMAIL = 'email',
}

interface FormData {
  [InputFieldNames.AMOUNT_OF_PEOPLE_VIP]: number,
  [InputFieldNames.AMOUNT_OF_PEOPLE_STANDART]: number,
  [InputFieldNames.PAYMENT_METHOD]: string,
  [InputFieldNames.PERSON_LAST_NAME]: string
  [InputFieldNames.PERSON_FIRST_NAME]: string
  [InputFieldNames.PERSON_EMAIL]: string
  [InputFieldNames.AMOUNT_OF_PEOPLE]: number
}

const BookEvent: VFC = () => {
  const classes = useStyles();
  const { data, loading } = useSelector(selectEventState);
  const user = useSelector(selectUserState);
  const apiReducer = useSelector(selectApiState);
  const { id } = useParams<{ id: string }>();
  const [date, setDate] = useState<string>('');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = useMemo(() => Joi.object({
    [InputFieldNames.AMOUNT_OF_PEOPLE_STANDART]: Joi.number(),

    [InputFieldNames.AMOUNT_OF_PEOPLE_VIP]: Joi.number(),

    [InputFieldNames.AMOUNT_OF_PEOPLE]: Joi.number()
      .min(1)
      .max(50)
      .required()
      .messages({
        'number.min': `${t('bookEvent.amountOfPeople.onePersonRequired')}`,
        'number.max': `${t('bookEvent.amountOfPeople.lessThanFifty')}`,
        'number.required': `${t('bookEvent.amountOfPeople.amountIsRequired')}`,
      }),

    [InputFieldNames.PAYMENT_METHOD]: Joi.string()
      .required()
      .messages({
        'string.empty': `${t('bookEvent.payment.paymentIsRequired')}`,
      }),

    [InputFieldNames.PERSON_FIRST_NAME]: Joi.string()
      .min(3)
      .trim()
      .required()
      .pattern(NAME_REG_EXP)
      .messages({
        'string.empty': `${t('signup.input.firstNameRequired')}`,
        'string.min': `${t('signup.input.firstNameLength')}`,
        'string.pattern.base': `${t('signup.input.firstNameNotValid')}`,
      }),

    [InputFieldNames.PERSON_LAST_NAME]: Joi.string()
      .min(3)
      .trim()
      .required()
      .pattern(NAME_REG_EXP)
      .messages({
        'string.empty': `${t('signup.input.lastNameRequired')}`,
        'string.min': `${t('signup.input.lastNameLength')}`,
        'string.pattern.base': `${t('signup.input.lastNameNotValid')}`,
      }),

    [InputFieldNames.PERSON_EMAIL]: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required()
      .messages({
        'string.empty': `${t('signup.login.emailForResetPage.input.emailRequired')}`,
        'string.email': `${t('signup.login.emailForResetPage.input.emailNotValid')}`,
      }),
  }), []);

  const {
    handleSubmit, control, formState, watch, setValue, getValues, reset,
  } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      [InputFieldNames.AMOUNT_OF_PEOPLE_VIP]: 0,
      [InputFieldNames.AMOUNT_OF_PEOPLE_STANDART]: 0,
      [InputFieldNames.AMOUNT_OF_PEOPLE]: 0,
      [InputFieldNames.PAYMENT_METHOD]: '',
      [InputFieldNames.PERSON_FIRST_NAME]: '',
      [InputFieldNames.PERSON_LAST_NAME]: '',
      [InputFieldNames.PERSON_EMAIL]: '',
    },
  });

  const formatDate = useCallback((): void => {
    const eventFullDate = new Date(data?.eventDate!);
    setDate(eventFullDate.toLocaleDateString('en-US'));
  }, [data]);

  useEffect(() => {
    if (!data) {
      dispatch(loadEventData(id));
    }
  }, [data]);

  const submitHandler = useCallback((ticketsData: FormData) => {
    if (data && user.data) {
      dispatch(createPaymentSession({
        event_id: id,
        currency: data.currency,
        user_id: user.data.userId.toString(),
        paymentMethod: ticketsData[InputFieldNames.PAYMENT_METHOD],
        customerName: `${ticketsData[InputFieldNames.PERSON_FIRST_NAME]} ${ticketsData[InputFieldNames.PERSON_LAST_NAME]}`,
        customerEmail: ticketsData[InputFieldNames.PERSON_EMAIL],
        successRoute: `${ROUTE_PAGES.bookEventState}/${data?.id}`,
        cancelRoute: `${ROUTE_PAGES.main}`,
        paymentData: [
          {
            title: TICKET_TYPES.standart,
            count: ticketsData[InputFieldNames.AMOUNT_OF_PEOPLE_STANDART],
            price: data.price,
          },
          {
            title: TICKET_TYPES.vip,
            count: ticketsData[InputFieldNames.AMOUNT_OF_PEOPLE_VIP],
            price: data.vipPrice,
          },
        ],
      }));
    }
  }, [data, user.data]);

  useEffect(() => {
    formatDate();
  }, [formatDate]);

  const currentAmountOfPeople = Number(watch(
    InputFieldNames.AMOUNT_OF_PEOPLE_STANDART,
  )) + Number(watch(InputFieldNames.AMOUNT_OF_PEOPLE_VIP));

  useEffect(() => {
    setValue(InputFieldNames.AMOUNT_OF_PEOPLE, currentAmountOfPeople);
  }, [currentAmountOfPeople]);

  useEffect(() => {
    if (user.data) {
      const values = getValues();
      reset({
        ...values,
        [InputFieldNames.PERSON_FIRST_NAME]: user.data.firstName,
        [InputFieldNames.PERSON_LAST_NAME]: user.data.lastName,
        [InputFieldNames.PERSON_EMAIL]: user.data.email,
      });
    }
  }, [user.data]);

  if (loading) {
    return (
      <Grid>
        <Header />
        <LinearProgress className={classes.loader} />
      </Grid>
    );
  }

  if (!user.data) {
    return (
      <Grid>
        <Header />
        <Grid textAlign="center" className={classes.wrapper}>
          <Typography variant="h5">
            {t('bookingEvent.title.cannotBook')}
          </Typography>
          <Typography variant="h6">
            {t('bookingEvent.subtitle.authorize')}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  if (user.data.userId === data?.organizerId) {
    return (
      <Grid>
        <Header />
        <Grid textAlign="center" className={classes.wrapper}>
          <Typography variant="h5">
            {t('bookingEvent.title.cannotBook')}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid>
      <Header />
      <Container component="main" maxWidth="md">
        <Grid className={classes.wrapper} textAlign="center">
          <Grid>
            <Typography variant="h4">
              {t('bookingEvent.title.booking')}
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="h5">
              {t('bookingEvent.subtitle.eventInformation')}
            </Typography>
            <Typography className={classes.eventName}>
              {`${data?.category} "${data?.title}"`}
            </Typography>
            <Typography>
              {`${t('bookingEvent.subtitle.date')}: ${date}`}
            </Typography>
            <Typography>
              {`${t('bookingEvent.subtitle.startsAt')}: ${new Date(data?.eventDate!).getHours()}:${(new Date(data?.eventDate!).getMinutes() < 10 ? '0' : '') + new Date(data?.eventDate!).getMinutes()}`}
            </Typography>
            <Typography>
              {`${t('bookingEvent.subtitle.oneTicketCost')}:`}
            </Typography>
            <Typography>
              {`Standart - ${data?.price}€`}
            </Typography>
            {data?.vipPrice
              ? (
                <Typography>
                  {`VIP - ${data?.vipPrice}€`}
                </Typography>
              ) : (
                <>
                </>
              )}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" textAlign="center">
          <Grid className={classes.formWrapper} item lg={6} md={9} sm={12} component="form" onSubmit={handleSubmit(submitHandler)}>
            <Grid className={classes.inputWrapper}>
              <InputWrapper
                control={control}
                name={InputFieldNames.AMOUNT_OF_PEOPLE_STANDART}
                variant="standard"
                label={`${t('bookingEvent.label.amountOfPeople')} - Standart`}
                error={!!formState.errors[InputFieldNames.AMOUNT_OF_PEOPLE]?.message}
                helperText={formState.errors[InputFieldNames.AMOUNT_OF_PEOPLE]?.message}
                fullWidth
              />
            </Grid>
            <Grid className={classes.inputWrapper}>
              <InputWrapper
                control={control}
                name={InputFieldNames.AMOUNT_OF_PEOPLE_VIP}
                variant="standard"
                label={`${t('bookingEvent.label.amountOfPeople')} - VIP`}
                error={!!formState.errors[InputFieldNames.AMOUNT_OF_PEOPLE]?.message}
                helperText={formState.errors[InputFieldNames.AMOUNT_OF_PEOPLE]?.message}
                fullWidth
              />
            </Grid>
            <Grid className={classes.inputWrapper}>
              <Typography variant="h6">
                {t('peopleInfo.form.title')}
              </Typography>
              <InputWrapper
                control={control}
                name={InputFieldNames.PERSON_FIRST_NAME}
                error={!!formState.errors[InputFieldNames.PERSON_FIRST_NAME]?.message}
                helperText={formState.errors[InputFieldNames.PERSON_FIRST_NAME]?.message}
                label={t('signup.input.firstName')}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid className={classes.inputWrapper}>
              <InputWrapper
                control={control}
                label={t('signup.input.lastName')}
                fullWidth
                variant="standard"
                name={InputFieldNames.PERSON_LAST_NAME}
                error={!!formState.errors[InputFieldNames.PERSON_LAST_NAME]?.message}
                helperText={formState.errors[InputFieldNames.PERSON_LAST_NAME]?.message}
              />
            </Grid>
            <Grid className={classes.inputWrapper}>
              <InputWrapper
                control={control}
                label={t('signup.login.emailForResetPage.input.email')}
                fullWidth
                variant="standard"
                name={InputFieldNames.PERSON_EMAIL}
                error={!!formState.errors[InputFieldNames.PERSON_EMAIL]?.message}
                helperText={formState.errors[InputFieldNames.PERSON_EMAIL]?.message}
              />
            </Grid>
            <Grid className={classes.inputWrapper}>
              <FormControl>
                <Typography color="error">
                  {formState.errors.paymentMethod?.message || ''}
                </Typography>
                <FormLabel htmlFor="payment-options">{t('bookingEvent.label.paymentMethod')}</FormLabel>
                <Controller
                  name={InputFieldNames.PAYMENT_METHOD}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      id="payment-options"
                    >
                      <FormControlLabel value="card" control={<Radio />} label={`${t('bookingEvent.radio.creditCard')} (MasterCard, Visa)`} />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid container direction="column" justifyContent="center" textAlign="center">
              <Typography color="error">
                {apiReducer.error || ''}
              </Typography>
              <Grid>
                {apiReducer.loading
                  ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      type="submit"
                      fullWidth={false}
                    >
                      {t('eventInfo.button.book')}
                    </Button>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default BookEvent;
