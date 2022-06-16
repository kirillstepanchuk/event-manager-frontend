import React, {
  FC, useCallback, ChangeEvent, useMemo,
} from 'react';
import {
  Grid,
  Theme,
  Paper,
  Typography,
  Button,
  FormControlLabel,
  FormControl,
  Checkbox,
  FormLabel,
  CircularProgress,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';

import { EVENT_CATEGORIES_IDS, UNDEFINED_ERROR } from '../../constants';
import Joi from '../../joi.setup';
import subscribeToNewsletters from '../../store/actions/sendRequest/subscribeForNewsletters';
import { selectApiState, selectUserCategories } from '../../store/selectors/selectors';
import { UserCategorie } from '../../types/user';

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  formWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: theme.spacing(28),
  },
  formTitle: {
    marginTop: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  buttons: {
    marginBottom: theme.spacing(6),
  },
  button: {
    color: theme.palette.primary.main,
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
}));

interface ComponentProps {
  close: () => void
}

enum InputFieldNames {
  CATEGORIES = 'categories',
}

interface FormData {
  [InputFieldNames.CATEGORIES]: string[]
}

const EventCategoriesModal: FC<ComponentProps> = ({ close }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(selectApiState);
  const userCategories = useSelector(selectUserCategories);

  const validationSchema = useMemo(() => Joi.object({
    [InputFieldNames.CATEGORIES]: Joi.array()
      .min(1)
      .messages({
        'array.min': t('interestingCategories.validation.requiredCategory'),
      }),
  }), []);

  const {
    handleSubmit, setValue, getValues, formState,
  } = useForm<FormData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      [InputFieldNames.CATEGORIES]: [],
    },
  });

  const updateCategories = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setValue(
      InputFieldNames.CATEGORIES,
      [evt.target.value, ...getValues()[InputFieldNames.CATEGORIES]],
    );
  }, []);

  const submitHandler = useCallback((formData: FormData) => {
    dispatch(subscribeToNewsletters(formData));
  }, []);

  return (
    <Grid container justifyContent="center" className={classes.modal}>
      <Grid item component="form" onSubmit={handleSubmit(submitHandler)}>
        <Paper
          className={classes.formWrapper}
          elevation={12}
        >
          <Grid container justifyContent="center">
            <Grid item xs={8}>
              <Typography
                variant="h5"
                className={classes.formTitle}
              >
                {t('interestingCategories.title.selectCategories')}
              </Typography>
              <Typography variant="subtitle1">
                {t('interestingCategories.subtitle.newsletters')}
              </Typography>
            </Grid>
          </Grid>
          <FormControl>
            <FormLabel id="category-label" error={!!formState.errors[InputFieldNames.CATEGORIES]}>{t('createEvent.subtitle.category')}</FormLabel>
            <FormControlLabel
              control={(
                <Checkbox
                  value={EVENT_CATEGORIES_IDS.concert}
                  name={InputFieldNames.CATEGORIES}
                  onChange={updateCategories}
                  defaultChecked={!!userCategories.data?.find(
                    (elem: UserCategorie) => elem.category_name === 'concert',
                  )}
                />
              )}
              label={`${t('interestingCategories.checkbox.concert')}`}
            />
            <FormControlLabel
              control={(
                <Checkbox
                  value={EVENT_CATEGORIES_IDS.standup}
                  name={InputFieldNames.CATEGORIES}
                  onChange={updateCategories}
                  defaultChecked={!!userCategories.data?.find(
                    (elem: UserCategorie) => elem.category_name === 'standup',
                  )}
                />
              )}
              label="Standup"
            />
          </FormControl>
          {loading && <CircularProgress />}
          <Typography>
            {(error === UNDEFINED_ERROR ? t('request.error.undefinedError') : error) || data}
          </Typography>
          <Grid
            className={classes.buttons}
            container
            justifyContent="space-around"
          >
            <Button
              variant="text"
              type="submit"
              className={classes.button}
            >
              {t('interestingCategories.button.confirm')}
            </Button>
            <Button
              variant="text"
              type="button"
              className={classes.button}
              onClick={close}
            >
              {t('interestingCategories.button.close')}
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EventCategoriesModal;
