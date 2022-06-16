import {
  Avatar,
  Grid, Theme, Typography,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => createStyles({
  eventCard: {
    marginBottom: theme.spacing(5),
  },
  eventInfo: {
    width: '250px',
  },
  eventTitle: {
    marginTop: theme.spacing(2),
    marginBotton: theme.spacing(5),
  },
  eventLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  userAvatar: {
    width: '200px',
    height: '200px',
    backgroundColor: theme.palette.primary.light,
    fontSize: theme.typography.fontSize * 4,
  },
}));

interface ComponentProps {
  userFirstName: string
  userLastName: string
  link: string
  linkText: string
}

const EventCard: FC<ComponentProps> = ({
  userFirstName, userLastName, link, linkText,
}) => {
  const classes = useStyles();

  return (
    <Grid item lg={3} md={4} sm={6} xs={12} className={classes.eventCard}>
      <Grid container justifyContent="space-around">
        <Grid>
          <Grid>
            <Avatar className={classes.userAvatar}>{userFirstName.split('')[0]}</Avatar>
          </Grid>
          <Grid>
            <Typography>
              {`${userFirstName} ${userLastName}`}
            </Typography>
          </Grid>
          <Grid container justifyContent="space-between" alignItems="center" className={classes.eventTitle}>
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
