import React, {
  useCallback, useEffect, useMemo, useState, VFC,
} from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Theme,
  Typography,
  CircularProgress,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useForm, Controller } from 'react-hook-form';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Joi from '../../joi.setup';
import InputWrapper from '../../components/common/InputWrapper';
import { Position } from '../../types/events';
import Autocomplete from '../map/Autocomplete';
import CurrentLocationMarker from '../map/CurrentLocationMarker';
import {
  CURRENCIES, EVENT_CATEGORIES, NAME_REG_EXP, ROUTE_PAGES,
} from '../../constants';
import { imageToBase64 } from '../../utils/imageToBase64';
import fileFromDataURL from '../../utils/fileFromDataURL';
import Map from '../../components/common/Map';
import addNewEvent from '../../store/actions/sendRequest/addEvent';
import editEvent from '../../store/actions/sendRequest/editEvent';
import { selectApiState, selectEventState } from '../../store/selectors/selectors';
import closeAlert from '../../store/actions/sendRequest/closeAlert';

enum InputFieldNames {
  TITLE = 'title',
  PRICE = 'price',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  DESCRIPTION = 'description',
  ADDRESS = 'address',
  LOCATION_LONGTITUDE = 'longtitude',
  LOCATION_LATITUDE = 'latitude',
  CATEGORY = 'category',
  PREVIEW = 'preview',
  CONTACT_PERSON = 'contactPerson',
  CONTACT_OPTION = 'contactOption',
  CURRENCY = 'currency',
  VIP_PRICE = 'vipPrice',
}

interface FormData {
  [InputFieldNames.TITLE]: string
  [InputFieldNames.PRICE]: number
  [InputFieldNames.START_DATE]: Date
  [InputFieldNames.END_DATE]: Date
  [InputFieldNames.DESCRIPTION]: string
  [InputFieldNames.ADDRESS]: string
  [InputFieldNames.CATEGORY]: string
  [InputFieldNames.PREVIEW]: File
  [InputFieldNames.LOCATION_LONGTITUDE]: number
  [InputFieldNames.LOCATION_LATITUDE]: number
  [InputFieldNames.CONTACT_PERSON]: string
  [InputFieldNames.CONTACT_OPTION]: string
  [InputFieldNames.CURRENCY]: string
  [InputFieldNames.VIP_PRICE]: number
}

const containerStyle = {
  width: '70vw',
  height: '50vh',
};

const defaultCenter: Position = {
  lat: 53.904541,
  lng: 27.561523,
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    marginLeft: theme.spacing(2),
  },
  inputWrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  previewInput: {
    display: 'none',
  },
  previewButton: {
    textTransform: 'initial',
    alignItems: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  placeGrid: {
    marginTop: theme.spacing(5),
  },
  inputGrid: {
    position: 'absolute',
    zIndex: '10',
    left: '0',
    marginTop: theme.spacing(3),
  },
  dateTime: {
    marginTop: theme.spacing(5),
  },
  selectControl: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  select: {
    background: theme.palette.secondary.light,
    '&:after': {
      background: theme.palette.secondary.light,
    },
    '&:hover': {
      background: theme.palette.secondary.light,
    },
    '&:focus': {
      background: theme.palette.secondary.light,
    },
  },
  submitButton: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  error: {
    color: theme.palette.error.main,
  },
  closeAlert: {
    color: theme.palette.secondary.light,
  },
}));

const EventForm: VFC = () => {
  const [center, setCenter] = useState<Position>(defaultCenter);
  const { data, loading } = useSelector(selectEventState);
  const apiReducer = useSelector(selectApiState);
  const { t } = useTranslation();
  const classes = useStyles();
  const { eventId } = useParams<{ eventId: string }>();
  const startDate = new Date(Date.now());
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string>('');

  const validationSchema = useMemo(() => Joi.object({
    [InputFieldNames.PREVIEW]: Joi.filelist()
      .min(1)
      .messages({
        'filelist.min': `${t('createEvent.error.previewIsRequired')}`,
      }),

    [InputFieldNames.TITLE]: Joi.string()
      .min(5)
      .max(30)
      .required()
      .messages({
        'string.min': `${t('createEvent.error.titleIsShort')}`,
        'string.max': `${t('createEvent.error.titleIsLong')}`,
        'string.empty': `${t('createEvent.error.titleIsRequired')}`,
      }),

    [InputFieldNames.PRICE]: Joi.number()
      .required()
      .min(1)
      .max(999)
      .messages({
        'number.min': `${t('createEvent.error.priceCannotBeZero')}`,
        'number.max': `${t('createEvent.error.priceIsBig')}`,
        'string.empty': `${t('createEvent.error.priceIsRequired')}`,
      }),

    [InputFieldNames.VIP_PRICE]: Joi.number()
      .required()
      .min(1)
      .max(999)
      .messages({
        'number.min': `${t('createEvent.error.priceCannotBeZero')}`,
        'number.max': `${t('createEvent.error.priceIsBig')}`,
        'string.empty': `${t('createEvent.error.priceIsRequired')}`,
      }),

    [InputFieldNames.ADDRESS]: Joi.string()
      .required()
      .messages({
        'string.empty': `${t('createEvent.error.addressIsRequired')}`,
      }),

    [InputFieldNames.DESCRIPTION]: Joi.string()
      .required()
      .min(30)
      .max(999)
      .messages({
        'string.min': `${t('createEvent.error.descriptionIsShort')}`,
        'string.max': `${t('createEvent.error.descriptionIsBig')}`,
        'string.empty': `${t('createEvent.error.descriptionIsRequired')}`,
      }),

    [InputFieldNames.LOCATION_LONGTITUDE]: Joi.number()
      .required()
      .messages({
        'any.required': `${t('createEvent.error.locationIsRequired')}`,
      }),

    [InputFieldNames.LOCATION_LATITUDE]: Joi.number()
      .required()
      .messages({
        'any.required': `${t('createEvent.error.locationIsRequired')}`,
      }),

    [InputFieldNames.START_DATE]: Joi.date(),

    [InputFieldNames.END_DATE]: Joi.date()
      .greater(startDate.setHours(startDate.getHours() + 1))
      .messages({
        'date.greater': `${t('createEvent.error.endDateGreaterThanStart')}`,
      }),

    [InputFieldNames.CATEGORY]: Joi.string(),

    [InputFieldNames.CONTACT_PERSON]: Joi.string()
      .min(3)
      .trim()
      .required()
      .pattern(NAME_REG_EXP)
      .messages({
        'string.empty': `${t('signup.input.firstNameRequired')}`,
        'string.min': `${t('signup.input.firstNameLength')}`,
        'string.pattern.base': `${t('signup.input.firstNameNotValid')}`,
      }),

    [InputFieldNames.CONTACT_OPTION]: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.empty': `${t('signup.login.emailForResetPage.input.emailRequired')}`,
        'string.email': `${t('signup.login.emailForResetPage.input.emailNotValid')}`,
      }),

    [InputFieldNames.CURRENCY]: Joi.string(),
  }), []);

  const {
    control, handleSubmit, setValue, getValues, register, formState, reset, watch,
  } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      [InputFieldNames.TITLE]: '',
      [InputFieldNames.PRICE]: 1,
      [InputFieldNames.VIP_PRICE]: 1,
      [InputFieldNames.START_DATE]: new Date(Date.now()),
      [InputFieldNames.END_DATE]: new Date(Date.now()),
      [InputFieldNames.DESCRIPTION]: '',
      [InputFieldNames.ADDRESS]: '',
      [InputFieldNames.LOCATION_LONGTITUDE]: undefined,
      [InputFieldNames.LOCATION_LATITUDE]: undefined,
      [InputFieldNames.CATEGORY]: EVENT_CATEGORIES.concert,
      [InputFieldNames.CONTACT_PERSON]: '',
      [InputFieldNames.CONTACT_OPTION]: '',
      [InputFieldNames.CURRENCY]: CURRENCIES.euro,
    },
  });

  const onPlaceSelect = useCallback((coordinates) => {
    setCenter(coordinates);
    setValue(InputFieldNames.LOCATION_LONGTITUDE, coordinates.lng);
    setValue(InputFieldNames.LOCATION_LATITUDE, coordinates.lat);
  }, []);

  const changeAddress = useCallback((value: string) => {
    setValue(InputFieldNames.ADDRESS, value);
  }, []);

  const submitHandler = useCallback(async (formData: FormData) => {
    const file = await imageToBase64(formData.preview);
    if (data) {
      dispatch(editEvent({ data: { ...formData, preview: file }, id: eventId }));
    } else {
      dispatch(addNewEvent({ ...formData, preview: file }));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const endDate = new Date(data.eventEndDate);
      const eventStartDate = new Date(data.eventDate);
      setCenter({
        lng: data.lng!,
        lat: data.lat!,
      });
      reset({
        [InputFieldNames.TITLE]: data.title,
        [InputFieldNames.CATEGORY]: data.category,
        [InputFieldNames.LOCATION_LATITUDE]: data.lng!,
        [InputFieldNames.LOCATION_LONGTITUDE]: data.lat!,
        [InputFieldNames.ADDRESS]: data.address,
        [InputFieldNames.DESCRIPTION]: data.description,
        [InputFieldNames.START_DATE]: eventStartDate,
        [InputFieldNames.END_DATE]: endDate,
        [InputFieldNames.PREVIEW]: fileFromDataURL(data.preview, 'file'),
        [InputFieldNames.PRICE]: data.price,
        [InputFieldNames.CONTACT_PERSON]: data.contactPerson,
        [InputFieldNames.CONTACT_OPTION]: data.contactOption,
        [InputFieldNames.VIP_PRICE]: data.vipPrice,
        [InputFieldNames.CURRENCY]: data.currency,
      });
    }
  }, [data]);

  const changeImage = useCallback((e) => {
    setValue(InputFieldNames.PREVIEW, e.target.files[0]);
  }, []);

  const clearPreview = useCallback(() => {
    if (data) {
      setValue(InputFieldNames.PREVIEW, fileFromDataURL(data.preview, 'file'));
    }
  }, [data]);

  const closeNotification = useCallback(() => {
    dispatch(closeAlert());
  }, []);

  watch(InputFieldNames.PREVIEW);

  useMemo(async () => {
    const newPreview = await imageToBase64(getValues().preview);
    setPreview(newPreview);
  }, [getValues().preview]);

  return (
    <Grid>
      {loading
        ? (
          <LinearProgress />
        ) : (
          <Grid container direction="column" component="form" onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
            <Grid container alignItems="center">
              <Link to={ROUTE_PAGES.profile}>
                <Button
                  type="button"
                  variant="contained"
                >
                  <ArrowBackIcon />
                </Button>
              </Link>
              <Typography variant="h4" className={classes.title}>
                {data ? t('editEvent.title.editEvent') : t('createEvent.title.newEvent')}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={8}>
                <Grid>
                  <input
                    {...register(InputFieldNames.PREVIEW)}
                    accept="image/*"
                    id="preview-button"
                    name="preview-image"
                    type="file"
                    className={classes.previewInput}
                    onChange={changeImage}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    className={classes.previewButton}
                  >
                    <PhotoCameraIcon />
                    <label htmlFor="preview-button">
                      {t('createEvent.button.loadPreview')}
                    </label>
                  </Button>
                  {data && getValues().preview.size !== fileFromDataURL(data.preview, 'file').size
                    ? (
                      <Button
                        type="button"
                        variant="text"
                        onClick={clearPreview}
                      >
                        <CloseIcon />
                      </Button>
                    ) : (
                      <>
                      </>
                    )}
                  {formState.errors[InputFieldNames.PREVIEW]?.message
                    ? (
                      <Typography className={classes.error}>
                        {formState.errors[InputFieldNames.PREVIEW]?.message}
                      </Typography>
                    ) : (
                      <>
                      </>
                    )}
                </Grid>
                {data && <img src={preview} width="250" height="300" alt="event preview" />}
                <Grid item lg={5} md={7} sm={9} xs={12}>
                  <Grid container direction="column">
                    <Grid className={classes.inputWrapper}>
                      <InputWrapper
                        name={InputFieldNames.TITLE}
                        control={control}
                        error={!!formState.errors[InputFieldNames.TITLE]?.message}
                        helperText={formState.errors[InputFieldNames.TITLE]?.message}
                        variant="standard"
                        label={t('createEvent.input.eventTitle')}
                        fullWidth
                      />
                    </Grid>
                    <Grid className={classes.inputWrapper}>
                      <InputWrapper
                        name={InputFieldNames.PRICE}
                        control={control}
                        error={!!formState.errors[InputFieldNames.PRICE]?.message}
                        helperText={formState.errors[InputFieldNames.PRICE]?.message}
                        variant="standard"
                        label={`${t('createEvent.input.eventPrice')} - Standart`}
                        fullWidth
                      />
                    </Grid>
                    <Grid className={classes.inputWrapper}>
                      <InputWrapper
                        name={InputFieldNames.VIP_PRICE}
                        control={control}
                        error={!!formState.errors[InputFieldNames.VIP_PRICE]?.message}
                        helperText={formState.errors[InputFieldNames.VIP_PRICE]?.message}
                        variant="standard"
                        label={`${t('createEvent.input.eventPrice')} - VIP`}
                        fullWidth
                      />
                    </Grid>
                    <Grid>
                      <Controller
                        name={InputFieldNames.CURRENCY}
                        control={control}
                        render={({ field }) => (
                          <FormControl className={classes.selectControl}>
                            <InputLabel id="category-label">{t('createEvent.input.currency')}</InputLabel>
                            <Select
                              {...field}
                              variant="outlined"
                              className={classes.select}
                              labelId="category-label"
                              label="Category"
                            >
                              <MenuItem value={CURRENCIES.usd}>USD</MenuItem>
                              <MenuItem value={CURRENCIES.euro}>EUR</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid container direction="column">
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <Grid className={classes.dateTime}>
                      <Controller
                        name={InputFieldNames.START_DATE}
                        control={control}
                        render={({ field }) => (
                          <DateTimePicker
                            {...field}
                            label={t('createEvent.label.startsAt')}
                            value={getValues()[InputFieldNames.START_DATE]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={!!formState.errors[InputFieldNames.START_DATE]?.message}
                                helperText={formState.errors[InputFieldNames.START_DATE]?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>
                    <Grid className={classes.dateTime}>
                      <Controller
                        name={InputFieldNames.END_DATE}
                        control={control}
                        render={({ field }) => (
                          <DateTimePicker
                            {...field}
                            label={t('createEvent.label.endsAt')}
                            value={getValues()[InputFieldNames.END_DATE]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={!!formState.errors[InputFieldNames.END_DATE]?.message}
                                helperText={formState.errors[InputFieldNames.END_DATE]?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>
                  </LocalizationProvider>
                  <Grid className={classes.inputWrapper}>
                    <InputWrapper
                      name={InputFieldNames.CONTACT_PERSON}
                      control={control}
                      error={!!formState.errors[InputFieldNames.CONTACT_PERSON]?.message}
                      helperText={formState.errors[InputFieldNames.CONTACT_PERSON]?.message}
                      variant="standard"
                      label={t('createEvent.input.contactPerson')}
                      fullWidth
                    />
                  </Grid>
                  <Grid className={classes.inputWrapper}>
                    <InputWrapper
                      name={InputFieldNames.CONTACT_OPTION}
                      control={control}
                      error={!!formState.errors[InputFieldNames.CONTACT_OPTION]?.message}
                      helperText={formState.errors[InputFieldNames.CONTACT_OPTION]?.message}
                      variant="standard"
                      label={t('createEvent.input.contactOption')}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.placeGrid}>
              <Typography variant="h5">
                {t('createEvent.subtitle.place')}
              </Typography>
              <Typography variant="h6">
                {t('eventForm.address.enter')}
              </Typography>
              {data
                ? (
                  <Grid container>
                    <Typography variant="h6">
                      {`${t('createEvent.address.currentAddress')} ${getValues().address}`}
                    </Typography>
                  </Grid>
                ) : (
                  <>
                  </>
                )}
              {formState.errors[InputFieldNames.ADDRESS]?.message
                ? (
                  <Typography className={classes.error}>
                    {formState.errors[InputFieldNames.ADDRESS]?.message}
                  </Typography>
                ) : (
                  <>
                  </>
                )}
              {formState.errors[InputFieldNames.LOCATION_LONGTITUDE]?.message
                ? (
                  <Typography className={classes.error}>
                    {formState.errors[InputFieldNames.LOCATION_LONGTITUDE]?.message}
                  </Typography>
                ) : (
                  <>
                  </>
                )}
              <Grid>
                <Grid container justifyContent="center" className={classes.inputGrid}>
                  <Grid item lg={4} md={5} sm={7} xs={8}>
                    <Autocomplete
                      onSelect={onPlaceSelect}
                      placeholder={t('createEvent.placeholder.writeAddress')}
                      onAddressChange={changeAddress}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Map
                    containerStyle={containerStyle}
                    center={center}
                  >
                    <CurrentLocationMarker position={center} />
                  </Map>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Controller
                name={InputFieldNames.CATEGORY}
                control={control}
                render={({ field }) => (
                  <FormControl className={classes.selectControl}>
                    <InputLabel id="category-label">{t('createEvent.subtitle.category')}</InputLabel>
                    <Select
                      {...field}
                      variant="outlined"
                      className={classes.select}
                      labelId="category-label"
                      label="Category"
                    >
                      <MenuItem value={EVENT_CATEGORIES.concert}>{t('createEvent.select.concertCategory')}</MenuItem>
                      <MenuItem value={EVENT_CATEGORIES.standup}>{t('createEvent.select.standupCategory')}</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid>
              <Grid item lg={5} md={7} sm={9} xs={12}>
                <InputWrapper
                  name={InputFieldNames.DESCRIPTION}
                  control={control}
                  variant="outlined"
                  label="Description"
                  error={!!formState.errors[InputFieldNames.DESCRIPTION]?.message}
                  helperText={formState.errors[InputFieldNames.DESCRIPTION]?.message}
                  multiline
                  rows={4}
                  maxRows={Infinity}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="center">
              {apiReducer.loading
                ? (
                  <CircularProgress />
                ) : (
                  <>
                  </>
                )}
              <Grid>
                {data
                  ? (
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.submitButton}
                    >
                      {t('editProfile.editEvent.button.saveChanges')}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.submitButton}
                    >
                      {t('createEvent.button.create')}
                    </Button>
                  )}
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!apiReducer.data || !!apiReducer.error}
                autoHideDuration={6000}
                message={apiReducer.data || apiReducer.error}
                action={(
                  <Button onClick={closeNotification} className={classes.closeAlert}>
                    <CloseIcon />
                  </Button>
                )}
              />
            </Grid>
          </Grid>
        )}
    </Grid>
  );
};

export default EventForm;
