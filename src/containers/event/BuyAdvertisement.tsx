import React, {
  useCallback,
  useEffect,
  useMemo, VFC,
} from 'react';
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid, InputLabel, MenuItem, RadioGroup, Select, TextField, Theme, Typography,
  Radio,
  Button,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { joiResolver } from '@hookform/resolvers/joi';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Joi from '../../joi.setup';
import Header from '../../components/common/Header';
import loadEventData from '../../store/actions/loadEventData/loadEventData';
import createAdvertisementPayment from '../../store/actions/sendRequest/createAdvertisemetPayment';
import { selectApiState, selectEventState, selectUserState } from '../../store/selectors/selectors';
import { CURRENCIES, ROUTE_PAGES, UNDEFINED_ERROR } from '../../constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  wrapper: {
    marginTop: theme.spacing(6),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  typography: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  selectControl: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

enum InputFieldNames {
  AD_START_DATETIME = 'startDatetime',
  AD_END_DATETIME = 'endDatetime',
  DAILY_FREQUENCY = 'frequency',
  PAYMENT_METHOD = 'paymentMethod',
}

interface FormData {
  [InputFieldNames.AD_START_DATETIME]: Date
  [InputFieldNames.AD_END_DATETIME]: Date
  [InputFieldNames.DAILY_FREQUENCY]: string
  [InputFieldNames.PAYMENT_METHOD]: string
}

const dayPrices = {
  premium: 4.99,
  standart: 9.99,
  low: 19.99,
};

const frequencyPrices = {
  low: 4.99,
  standart: 9.99,
  premium: 19.99,
};

const adFrequencies = {
  low: '25',
  medium: '50',
  high: '50',
};

const BuyAdvertisement: VFC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const startDate = new Date(Date.now());
  const { eventId } = useParams<{ eventId: string }>();
  const { data, loading, error } = useSelector(selectEventState);
  const apiReducer = useSelector(selectApiState);
  const user = useSelector(selectUserState);
  const dispatch = useDispatch();

  const validationSchema = useMemo(() => Joi.object({
    [InputFieldNames.AD_START_DATETIME]: Joi.date()
      .greater(new Date(Date.now()))
      .messages({
        'date.greater': `${t('buyingAdvertisement.error.startDateGreaterThanNow')}`,
      }),

    [InputFieldNames.AD_END_DATETIME]: Joi.date()
      .greater(startDate.setHours(startDate.getHours() + 24))
      .messages({
        'date.greater': `${t('buyingAdvertisement.error.endDateGreaterThanStart')}`,
      }),

    [InputFieldNames.PAYMENT_METHOD]: Joi.string()
      .required()
      .messages({
        'string.empty': `${t('buyinAdvertisement.error.paymentMethodRequired')}`,
      }),

    [InputFieldNames.DAILY_FREQUENCY]: Joi.number(),
  }), []);

  const {
    handleSubmit, formState, control, getValues, watch,
  } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      [InputFieldNames.AD_START_DATETIME]: new Date(Date.now()),
      [InputFieldNames.AD_END_DATETIME]: new Date(Date.now()),
      [InputFieldNames.DAILY_FREQUENCY]: adFrequencies.low,
      [InputFieldNames.PAYMENT_METHOD]: '',
    },
  });

  const totalPrice = useMemo((): number => {
    const formValues = getValues();
    let frequency: number;
    switch (formValues.frequency) {
      case adFrequencies.medium:
        frequency = frequencyPrices.standart;
        break;
      case adFrequencies.high:
        frequency = frequencyPrices.premium;
        break;
      case adFrequencies.low:
      default:
        frequency = frequencyPrices.low;
    }

    const daysCount = Math.round((formValues[InputFieldNames.AD_END_DATETIME].getTime()
    - formValues[InputFieldNames.AD_START_DATETIME].getTime()) / (1000 * 3600 * 24));
    let dayPrice: number;
    if (daysCount >= 1 && daysCount <= 3) {
      dayPrice = dayPrices.low;
    } else if (daysCount > 3 && daysCount <= 5) {
      dayPrice = dayPrices.standart;
    } else if (daysCount > 5) {
      dayPrice = dayPrices.premium;
    } else {
      dayPrice = dayPrices.low;
    }

    const total = Math.round((daysCount * (dayPrice + frequency)) * 100) / 100;
    return total;
  }, [getValues()]);

  const submitHandler = useCallback((formData: FormData) => {
    dispatch(createAdvertisementPayment({
      startDatetime: formData[InputFieldNames.AD_START_DATETIME],
      endDatetime: formData[InputFieldNames.AD_END_DATETIME],
      eventId,
      eventCategory: data?.category!,
      timeZone: data?.timeZone!,
      frequency: Number(formData.frequency),
      paymentData: {
        title: data?.title!,
        currency: CURRENCIES.euro,
        method: formData[InputFieldNames.PAYMENT_METHOD],
        price: totalPrice,
        successRoute: `${ROUTE_PAGES.buyAdvertisementStatus}/${data?.id}`,
        cancelRoute: `${ROUTE_PAGES.main}`,
      },
    }));
  }, [data, totalPrice]);

  useEffect(() => {
    if (!data) {
      dispatch(loadEventData(eventId));
    }
  }, [data]);

  if (loading) {
    return (
      <Grid>
        <Header />
        <LinearProgress className={classes.wrapper} />
      </Grid>
    );
  }

  if (!user.data) {
    return (
      <Grid>
        <Header />
        <Grid textAlign="center" className={classes.wrapper}>
          <Typography variant="h5">
            {t('buyingAdvertisement.title.cannotBuyAd')}
          </Typography>
          <Typography variant="h6">
            {t('buyingAdvertisement.subtitle.authorize')}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  if (user.data.userId !== data?.organizerId) {
    return (
      <Grid>
        <Header />
        <Grid textAlign="center" className={classes.wrapper}>
          <Typography variant="h5">
            {t('buyingAdvertisement.title.cannotBuyAd')}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid>
        <Header />
        <Grid textAlign="center" className={classes.wrapper}>
          <Typography variant="h5">
            {error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  watch();

  return (
    <Grid>
      <Header />
      <Container maxWidth="xs">
        <Grid
          className={classes.wrapper}
          container
          justifyContent="center"
          textAlign="center"
          component="form"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Typography variant="h4" className={classes.title}>
            {t('buyingAdvertisement.title.eventAdvertisement')}
          </Typography>
          <Grid container direction="column" alignItems="center">
            <LocalizationProvider dateAdapter={DateAdapter}>
              <Controller
                name={InputFieldNames.AD_START_DATETIME}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label={t('buyingAdvertisement.label.startsAt')}
                    value={getValues()[InputFieldNames.AD_START_DATETIME]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!formState.errors[InputFieldNames.AD_START_DATETIME]?.message}
                        helperText={
                          formState.errors[InputFieldNames.AD_START_DATETIME]?.message
                      }
                      />
                    )}
                  />
                )}
              />
              <Typography className={classes.typography}>
                {t('buyingAdvertisement.typography.until')}
              </Typography>
              <Controller
                name={InputFieldNames.AD_END_DATETIME}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label={t('buyingAdvertisement.label.endsAt')}
                    value={getValues()[InputFieldNames.AD_END_DATETIME]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!formState.errors[InputFieldNames.AD_END_DATETIME]?.message}
                        helperText={formState.errors[InputFieldNames.AD_END_DATETIME]?.message}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
            <Grid container direction="column" justifyContent="center">
              <Typography>
                {`${t('buyingAdvertisement.subtitle.oneToThreeDays')}: ${dayPrices.low}€/${t('buyingAdvertisement.subtitle.day')}`}
              </Typography>
              <Typography>
                {`${t('buyingAdvertisement.subtitle.threeToFiveDays')}: ${dayPrices.standart}€/${t('buyingAdvertisement.subtitle.day')}`}
              </Typography>
              <Typography>
                {`${t('buyingAdvertisement.subtitle.fiveToMoreDays')}: ${dayPrices.premium}€/${t('buyingAdvertisement.subtitle.day')}`}
              </Typography>
            </Grid>
            <Controller
              name={InputFieldNames.DAILY_FREQUENCY}
              control={control}
              render={({ field }) => (
                <FormControl className={classes.selectControl}>
                  <InputLabel id="category-label">{t('buyingAdvertisement.label.dailyFrequency')}</InputLabel>
                  <Select
                    {...field}
                    variant="outlined"
                    labelId="category-label"
                    label="Category"
                  >
                    <MenuItem value={adFrequencies.low}>{`${t('buyingAdvertisement.select.first')} (${frequencyPrices.low}€/${t('buyingAdvertisement.subtitle.day')})`}</MenuItem>
                    <MenuItem value={adFrequencies.medium}>{`${t('buyingAdvertisement.select.second')} (${frequencyPrices.standart}€/${t('buyingAdvertisement.subtitle.day')})`}</MenuItem>
                    <MenuItem value={adFrequencies.high}>{`${t('buyingAdvertisement.select.third')} (${frequencyPrices.premium}€/${t('buyingAdvertisement.subtitle.day')})`}</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <FormControl>
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
            <Typography color="error">
              {formState.errors[InputFieldNames.PAYMENT_METHOD]?.message}
            </Typography>
            {apiReducer.loading
              ? (
                <CircularProgress />
              ) : (
                <Typography color="error">
                  {apiReducer.error || ''}
                </Typography>
              )}
            <Typography>
              {`Total price: ${totalPrice}€`}
            </Typography>
            <Button
              type="submit"
            >
              {t('buyingAdvertisement.button.buyAdvertisement')}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default BuyAdvertisement;
