import React from 'react';
import { Grid } from '@mui/material';

import Header from '../../components/common/Header';
import EventContent from './EventContent';
import Container from '../../components/common/Container';

const EventPage = () => (
  <Grid>
    <Header />
    <Container>
      <EventContent />
    </Container>
  </Grid>
);

export default EventPage;
