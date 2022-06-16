import React, { VFC } from 'react';
import { Grid } from '@mui/material';

import EventForm from './EventForm';
import Header from '../../components/common/Header';
import Container from '../../components/common/Container';

const CreateNewEvent: VFC = () => (
  <Grid>
    <Header />
    <Container>
      <EventForm />
    </Container>
  </Grid>
);

export default CreateNewEvent;
