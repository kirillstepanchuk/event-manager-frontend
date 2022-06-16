import React, { FC } from 'react';
import { Grid, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    marginTop: theme.spacing(12),
    paddingLeft: theme.spacing(14),
    paddingRight: theme.spacing(14),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  },
}));

interface ComponentProps {
  children: React.ReactNode
}

const Container: FC<ComponentProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container}>
      {children}
    </Grid>
  );
};

export default Container;
