import React from 'react';
import { Grid } from '@mui/material';

import Header from '../../components/common/Header';
import Container from '../../components/common/Container';
import CSVInputContent from './CSVInputContent';

const ImportClientsPage = () => (
  <Grid>
    <Header />
    <Container>
      <CSVInputContent />
    </Container>
  </Grid>
);

export default ImportClientsPage;
