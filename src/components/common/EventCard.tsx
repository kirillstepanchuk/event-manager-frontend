import {
  Grid, Theme, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles } from '@mui/styles';
import React, {
  VFC, useMemo,
} from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => createStyles({
  eventCard: {
    marginBottom: theme.spacing(5),
  },
  eventInfo: {
    width: '250px',
    [theme.breakpoints.down('lg')]: {
      width: '225px',
    },
    [theme.breakpoints.down('md')]: {
      width: '200px',
    },
  },
  eventTitle: {
    marginTop: theme.spacing(2),
    marginBotton: theme.spacing(5),
  },
  eventLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  eventPreview: {
    objectFit: 'cover',
    width: '250px',
    [theme.breakpoints.down('lg')]: {
      width: '225px',
    },
    [theme.breakpoints.down('md')]: {
      width: '200px',
    },
  },
}));

interface ComponentProps {
  title: string,
  date: Date,
  time: Date,
  preview: string
  link: string
  linkText: string
  timeZone: number
}

const EventCard: VFC<ComponentProps> = ({
  title, date, time, preview, link, linkText, timeZone,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const eventDate = useMemo((): string => {
    const eventFullDate = new Date(date);
    return eventFullDate.toLocaleDateString();
  }, [date]);

  return (
    <Grid item lg={3} md={4} sm={6} xs={12} className={classes.eventCard}>
      <Grid container justifyContent="space-around">
        <Grid>
          <img src={preview} alt={t('eventCard.img.alt')} height="300" className={classes.eventPreview} />
          <Grid container justifyContent="space-between" className={classes.eventInfo}>
            <Grid>
              <Typography>
                {eventDate}
              </Typography>
              <Typography>
                {`${Number(time.toString().split(':')[0]) + timeZone}:${time.toString().split(':')[1]}`}
              </Typography>
            </Grid>
            <Grid>
              <Typography>
                {t('mainPage.eventInfo.price')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center" className={classes.eventTitle}>
            <Typography>
              {title}
            </Typography>
            <Link to={link} className={classes.eventLink}>
              {linkText}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EventCard;
