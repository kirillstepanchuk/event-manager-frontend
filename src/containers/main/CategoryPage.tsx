import React, { VFC } from 'react';
import { Grid } from '@mui/material';

import Controls from './Controls';
import CategoryOfEvents from './CategoryOfEvents';

const MainPage: VFC = () => (
  <Grid>
    <Controls />
    <CategoryOfEvents />
  </Grid>
);

export default MainPage;
