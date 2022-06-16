import { createStyles, makeStyles } from '@mui/styles';
import {
  Button, Grid, Theme,
} from '@mui/material';
import React, { FC } from 'react';

interface ButtonProps {
  text: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

const FormButton: FC<ButtonProps> = ({ text }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.button}>
      <Button
        variant="contained"
        fullWidth
        type="submit"
      >
        {text}
      </Button>
    </Grid>
  );
};

export default FormButton;
