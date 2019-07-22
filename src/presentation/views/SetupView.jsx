import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import UnconfiguredNodesCard from '../components/cards/UnconfiguredNodesCard';
import SetupDialog from '../components/dialogs/SetupDialog';

const SetupView = () => (
  <>
    <Container maxWidth="xl" style={{ marginTop: 20 }}>
      <Typography variant="h3" style={{ fontWeight: 'lighter' }} gutterBottom>
        Setup
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6} className="nodes-table-container">
          <UnconfiguredNodesCard />
        </Grid>
        <Grid item xs={12} md={6} className="nodes-table-container" />
      </Grid>
    </Container>
    <SetupDialog />
  </>
);

export default SetupView;
