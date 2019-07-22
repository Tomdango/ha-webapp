import React from 'react';
import { Typography, Container, Grid, Paper, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import GlobalRoutinesCard from '../components/cards/GlobalRoutinesCard';
import {
  openCreateGlobalRoutineDialog,
  closeCreateGlobalRoutineDialog,
} from '../../redux/actions/routinesActions';
import AddGlobalRoutineDialog from '../components/dialogs/routines/AddGlobalRoutine';

const RoutinesView = ({ globalRoutines, openAddDialog }) => {
  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <Typography variant="h2" gutterBottom>
          Routines
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5">Global Routines</Typography>
                <Button
                  color="secondary"
                  onClick={openAddDialog}
                  variant="contained"
                >
                  CREATE
                </Button>
              </div>
              <Typography variant="body2" gutterBottom>
                Global Routines apply to all areas within ths system, unless
                rooms are excluded.
              </Typography>
              {globalRoutines ? (
                <GlobalRoutinesCard globalRoutines={globalRoutines} />
              ) : (
                <Typography variant="subtitle1">
                  You have no global routines.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <AddGlobalRoutineDialog />
    </>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    openAddDialog: () => dispatch(openCreateGlobalRoutineDialog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutinesView);
