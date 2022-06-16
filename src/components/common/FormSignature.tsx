import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, Grid, Theme,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

interface FormSignatureInterface {
  signatureText: string
  signatureLink: string
  linkRoute: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  signature: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  signatureLink: {
    textDecoration: 'none',
    marginLeft: theme.spacing(1),
  },
}));

const FormSignature: FC<FormSignatureInterface> = (
  { signatureText, signatureLink, linkRoute },
) => {
  const classes = useStyles();
  return (
    <Grid className={classes.signature}>
      <Typography color="secondary">
        {`${signatureText}`}
      </Typography>
      <Link to={linkRoute} className={classes.signatureLink}>
        <Typography color="primary">
          {signatureLink}
        </Typography>
      </Link>
    </Grid>
  );
};

export default FormSignature;
