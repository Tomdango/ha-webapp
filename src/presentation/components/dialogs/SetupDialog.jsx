import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';
import {
  closeSetupDialog,
  cancelSetup,
  setupNode,
} from '../../../redux/actions/nodeActions';
import { getAreaStatus } from '../../../redux/actions/areaActions';

class SetupDialog extends Component {
  static propTypes = {
    areasFetched: PropTypes.bool.isRequired,
    ensureAreas: PropTypes.func.isRequired,
    setupActive: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    areas: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      selectedArea: null,
      name: '',
      validation: {
        name: true,
        selectedArea: true,
      },
    };
  }

  componentDidMount() {
    const { areasFetched, ensureAreas } = this.props;
    if (!areasFetched) {
      ensureAreas();
    }
  }

  handleSubmit = () => {
    const { name, selectedArea } = this.state;
    const { handleSubmit, setupNodeId } = this.props;
    const validation = {};
    validation.name = name !== '';
    validation.selectedArea = selectedArea !== null;
    const isValid = Object.values(validation).reduce(
      (prev, valid) => (prev ? valid : false),
      true,
    );
    if (isValid) {
      handleSubmit(setupNodeId, name, selectedArea);
      this.setState({ validation: {} });
    } else {
      this.setState({ validation });
    }
  };

  handleAreaSelect = e => {
    const { value } = e.target;
    this.setState({ selectedArea: value });
  };

  render() {
    const { setupActive, handleClose, handleCancel, areas } = this.props;
    const { selectedArea, validation, name } = this.state;
    return (
      <Dialog onClose={handleClose} open={setupActive}>
        <DialogTitle>Node Setup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This Node requires setup before it can operate properly.
          </DialogContentText>

          <TextField
            margin="none"
            label="Name"
            type="text"
            fullWidth
            error={!validation.name && name.length === 0}
            onChange={e => this.setState({ name: e.target.value })}
            style={{ marginBottom: 20 }}
          />
          <FormControl style={{ width: '100%', marginBottom: 20 }}>
            <InputLabel>Assigned Room</InputLabel>
            <Select
              value={selectedArea}
              onChange={this.handleAreaSelect}
              placeholder="Assigned Room"
              error={!validation.selectedArea && selectedArea === null}
              margin="none"
              label="Room"
            >
              {areas.map(area => (
                <MenuItem value={area.areaId}>{area.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginBottom: 10 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              onClick={this.handleSubmit}
              type="submit"
              variant="contained"
              style={{ marginLeft: 10, marginBottom: 10 }}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    setupActive: state.nodes.setup.setupActive,
    areas: state.areas.data.areas,
    areasFetched: state.areas.data.areasFetched,
    setupNodeId: state.nodes.setup.setupNodeId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => dispatch(closeSetupDialog()),
    handleCancel: () => dispatch(cancelSetup()),
    handleSubmit: (id, name, area) => dispatch(setupNode(id, name, area)),
    ensureAreas: () => dispatch(getAreaStatus()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupDialog);
