import {
  Button, Grid, Typography, Theme,
} from '@mui/material';
import React, { FC, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@mui/styles';
import { joiResolver } from '@hookform/resolvers/joi';

import Joi from '../../joi.setup';
import InputWrapper from './InputWrapper';
import loadSearchedEventsData from '../../store/actions/loadEventsData/loadSearchedEvents';
import { selectSearchedEventsState } from '../../store/selectors/selectors';

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  searchIcon: {
    height: '48px',
    width: '30px',
  },
}));

enum InputFieldNames {
  TITLE = 'title',
}

interface SearchData {
  [InputFieldNames.TITLE]: string
}

interface ComponentProps {
  controlTitle: string
  page: number,
}

const SearchControl: FC<ComponentProps> = ({ controlTitle, page }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(selectSearchedEventsState);
  const classes = useStyles();

  const validationSchema = useMemo(() => Joi.object({
    title: Joi.string()
      .trim()
      .required()
      .messages({
        'string.empty': `${t('searchControl.input.required')}`,
      }),

  }), []);

  const { handleSubmit, control, formState } = useForm<SearchData>({
    resolver: joiResolver(validationSchema),
    defaultValues: {
      [InputFieldNames.TITLE]: '',
    },
  });

  const searchEvents = useCallback((data: SearchData) => {
    dispatch(loadSearchedEventsData(data.title, page));
  }, []);

  return (
    <Grid container alignItems="center">
      <Grid item lg={7} md={10} xs={12}>
        <Typography variant="h4" className={classes.title}>
          {controlTitle}
        </Typography>
      </Grid>
      <Grid item lg={5} md={10} xs={12}>
        <Grid container component="form" onSubmit={handleSubmit(searchEvents)}>
          <Grid flexGrow="1">
            <InputWrapper
              name={InputFieldNames.TITLE}
              placeholder={t('mainPage.input.search')}
              error={!!formState.errors.title?.message}
              helperText={formState.errors.title?.message}
              control={control}
              fullWidth
              variant="outlined"
              disabled={loading}
            />
          </Grid>
          <Grid>
            <Button
              type="submit"
              variant="outlined"
              disabled={loading}
            >
              <SearchIcon className={classes.searchIcon} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchControl;
