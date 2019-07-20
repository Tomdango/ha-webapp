import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Typography, Button, Fade, Grid } from '@material-ui/core';
import NodeConfigPanel from '../components/cards/NodeConfigPanel';
import {
  fetchAreaData as fetchAreaDataAction,
  updateTargetTemperature,
  deleteRoutine as deleteRoutineAction,
  deleteArea as deleteAreaAction,
  toggleHeating as toggleHeatingAction,
} from '../../redux/actions/areaActions';
import RoutineSetupPanel from '../components/cards/RoutineSetupPanel';
import ChangeNameDialog from '../components/dialogs/areaConfig/ChangeName';
import AddRoutineDialog from '../components/dialogs/areaConfig/AddRoutine';
import SetTemperatureDialog from '../components/dialogs/SetTemperature';
import ConfirmationDialog from '../components/dialogs/Confirmation';
import TempHistoryPanel from '../components/cards/TempHistoryPanel';
import AssignedNodesPanel from '../components/cards/AssignedNodesPanel';
import AssignNode from '../components/dialogs/AssignNode';
import { fetchAllNodes } from '../../redux/actions/nodeActions';

class AreaConfigView extends Component {
  static propTypes = {
    areas: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
    }).isRequired,
    fetchAreaData: PropTypes.func.isRequired,
  };

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      openDialog: '',
      confirmationModalTitle: '',
      confirmationModalText: '',
      deleteRoutineId: '',
    };
  }

  componentDidMount() {
    const { areas, match, fetchAreaData, nodesLoaded, fetchNodes } = this.props;
    const { id } = match.params;
    const selectedArea = areas.filter(area => area.areaId === id);
    if (selectedArea.length === 0) {
      fetchAreaData(id);
    }
    if (!nodesLoaded) {
      fetchNodes();
    }
  }

  openDialog = dialog => {
    this.setState({ openDialog: dialog });
  };

  handleClose = () => {
    this.setState({ openDialog: '' });
  };

  handleDeleteArea = () => {
    const { areas, match } = this.props;
    const { id } = match.params;
    const [area] = areas.filter(area => area.areaId === id);
    this.setState({
      confirmationModalTitle: `Delete Area "${area.name}"`,
      confirmationModalText: 'Are you sure you want to delete this area?',
    });
    this.openDialog('deleteConfirmation');
  };

  onAcceptDeleteArea = () => {
    const { match, deleteArea, history } = this.props;
    const { id } = match.params;
    deleteArea(id);
    history.push('/areas');
  };

  deleteRoutine = routineId => {
    const { areas, match } = this.props;
    const { id } = match.params;
    const [area] = areas.filter(area => area.areaId === id);
    const [routine] = area.routines.filter(r => r._id === routineId);
    this.setState({
      deleteRoutineId: routineId,
      confirmationModalTitle: 'Routine Deletion',
      confirmationModalText: `Are you sure you want to delete the routine "${routine.name}"? This routine will no longer trigger any events.`,
    });
    this.openDialog('confirmation');
  };

  onRejectDeleteRoutine = () => {
    this.handleClose();
    setTimeout(
      () =>
        this.setState({
          confirmationModalText: '',
          confirmationModalTitle: '',
        }),
      200,
    );
  };

  onAcceptDeleteRoutine = () => {
    const { deleteRoutineId } = this.state;
    const { deleteRoutine, match } = this.props;
    const { id } = match.params;
    this.handleClose();
    deleteRoutine(id, deleteRoutineId);
    setTimeout(() => {
      this.setState({
        confirmationModalText: '',
        confirmationModalTitle: '',
      });
    }, 200);
  };

  handleTemperature = temp => {
    const { updateTargetTemp, match } = this.props;
    const { id } = match.params;
    updateTargetTemp(id, temp);
    this.handleClose();
  };

  handleToggle = e => {
    const { match, toggleHeating } = this.props;
    const { id } = match.params;
    const { checked } = e.target;
    toggleHeating(id, checked);
  };

  render() {
    const { areasNotFound, match, areas, history, nodes } = this.props;
    const {
      openDialog,
      confirmationModalTitle,
      confirmationModalText,
    } = this.state;
    const { id } = match.params;
    const loaded = !!areas.length;
    const notFound = areasNotFound.includes(id);
    let areaData = {};
    if (!notFound && loaded) {
      [areaData] = areas.filter(area => area.areaId === id);
    }

    const { name, targetTemperature } = areaData;
    return (
      <>
        <Container maxWidth="xl" style={{ marginTop: 20 }}>
          <Fade in>
            <div
              style={{
                display: 'flex',
                marginBottom: 20,
                alignItems: 'stretch',
                paddingBottom: 20,
                borderBottom: '1px solid #777',
              }}
            >
              <Button
                size="large"
                variant="outlined"
                onClick={() => history.push('/areas')}
              >
                Back
              </Button>
              <Typography style={{ marginLeft: 30 }} variant="h2">
                {name}
              </Typography>
            </div>
          </Fade>

          {notFound ? (
            <Typography variant="h2">
              Sorry, that area wasn&apos;t found.
            </Typography>
          ) : (
            <>
              <Fade in>
                <Grid container>
                  <Grid
                    className="nodes-table-container"
                    item
                    xs={12}
                    md={6}
                    lg={4}
                  >
                    <NodeConfigPanel
                      targetTemperature={targetTemperature}
                      openDialog={this.openDialog}
                      handleToggle={this.handleToggle}
                      handleDeleteArea={this.handleDeleteArea}
                      areaData={areaData}
                    />
                    <AssignedNodesPanel
                      nodes={nodes}
                      areaData={areaData}
                      openDialog={this.openDialog}
                    />
                  </Grid>
                  <Grid
                    className="nodes-table-container"
                    item
                    xs={12}
                    md={8}
                    lg={8}
                  >
                    <RoutineSetupPanel
                      areaData={areaData}
                      openDialog={this.openDialog}
                      deleteRoutine={this.deleteRoutine}
                    />
                    <TempHistoryPanel
                      id={id}
                      style={{ marginTop: 1000 }}
                      areaData={areaData}
                    />
                  </Grid>
                </Grid>
              </Fade>
            </>
          )}
        </Container>
        <ChangeNameDialog
          onClose={this.handleClose}
          open={openDialog === 'changeName'}
        />
        <AddRoutineDialog
          onClose={this.handleClose}
          open={openDialog === 'addRoutine'}
        />
        <SetTemperatureDialog
          onSubmit={this.handleTemperature}
          onClose={this.handleClose}
          open={openDialog === 'setTemperature'}
        />
        <ConfirmationDialog
          onAccept={this.onAcceptDeleteRoutine}
          onReject={this.onRejectDeleteRoutine}
          title={confirmationModalTitle}
          text={confirmationModalText}
          open={openDialog === 'confirmation'}
        />
        <ConfirmationDialog
          onAccept={this.onAcceptDeleteArea}
          onReject={this.onRejectDeleteRoutine}
          title={confirmationModalTitle}
          text={confirmationModalText}
          open={openDialog === 'deleteConfirmation'}
        />
        <AssignNode
          id={id}
          open={openDialog === 'assignNode'}
          onClose={this.handleClose}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    areas: state.areas.data.areas,
    areasNotFound: state.areas.data.areasNotFound,
    nodes: state.nodes.data.nodes,
    nodesLoaded: state.nodes.data.nodesLoaded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAreaData: id => dispatch(fetchAreaDataAction(id)),
    updateTargetTemp: (id, temp) => dispatch(updateTargetTemperature(id, temp)),
    deleteRoutine: (id, routineId) =>
      dispatch(deleteRoutineAction(id, routineId)),
    deleteArea: id => dispatch(deleteAreaAction(id)),
    fetchNodes: () => dispatch(fetchAllNodes()),
    toggleHeating: (id, on) => dispatch(toggleHeatingAction(id, on)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AreaConfigView),
);
