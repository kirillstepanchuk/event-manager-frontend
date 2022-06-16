import React, { useEffect, VFC } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import Header from '../../components/common/Header';
import EventForm from './EventForm';
import loadEventData from '../../store/actions/loadEventData/loadEventData';
import Container from '../../components/common/Container';

const EditEvent: VFC = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    dispatch(loadEventData(eventId));
  }, []);

  return (
    <Grid>
      <Header />
      <Container>
        <EventForm />
      </Container>
    </Grid>
  );
};

export default EditEvent;
