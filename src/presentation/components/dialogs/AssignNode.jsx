import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Select,
  MenuItem,
  Typography,
  DialogActions,
  Button,
} from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllNodes } from '../../../redux/actions/nodeActions';
import { setNodes } from '../../../redux/actions/areaActions';

class AssignNode extends Component {
  static defaultProps = {
    initialMonitor: 'none',
    initialHeaters: [],
  };

  constructor(props, ...rest) {
    super(props, ...rest);
    const { initialMonitor, initialHeaters } = this.props;
    this.state = {
      monitor: initialMonitor,
      heaters: [...initialHeaters, ''],
    };
  }

  componentDidMount() {
    const { nodesLoaded, fetchNodes } = this.props;
    if (!nodesLoaded) {
      fetchNodes();
    }
  }

  addHeaterNode = () => {
    const { heaters } = this.state;
    const hasEmpty = heaters.includes('') || heaters.includes('error');
    if (!hasEmpty) {
      this.setState({ heaters: [...heaters, ''] });
    } else {
      const emptyIndex = heaters.indexOf('');
      if (emptyIndex !== -1) {
        heaters[emptyIndex] = 'error';
        this.setState({ heaters });
      }
    }
  };

  handleMonitorChange = e => {
    this.setState({ monitor: e.target.value });
  };

  handleCancel = () => {
    const { onClose } = this.props;
    onClose();
    const { initialMonitor, initialHeaters } = this.props;
    this.setState({
      monitor: initialMonitor,
      heaters: [...initialHeaters, ''],
    });
  };

  handleHeaterChange = (previousValue, newValue) => {
    const { heaters } = this.state;
    const currentIndex = heaters.indexOf(previousValue);
    heaters[currentIndex] = newValue;
    this.setState({ heaters });
  };

  handleSubmit = () => {
    const { assignNodes, match } = this.props;
    const { id } = match.params;
    const { heaters, monitor } = this.state;
    const allNodes = [...heaters, monitor];
    assignNodes(id, allNodes.filter(node => node !== '' && node !== 'none'));
    this.handleCancel();
  };

  render() {
    const { open, onClose, nodes } = this.props;
    const { monitor, heaters } = this.state;
    const monitorNodes = nodes.filter(
      node => node.type === 'monitor' && node.initialized === true,
    );
    const heaterNodes = nodes.filter(
      node => node.type === 'heater' && node.initialized === true,
    );
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Assign Nodes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            An area can only have one monitor node, but a monitor node can be
            assigned to multiple areas.
          </DialogContentText>
          <Typography variant="subtitle2">Monitor Node</Typography>
          <Select
            value={monitor}
            style={{ marginBottom: 30 }}
            onChange={this.handleMonitorChange}
            fullWidth
          >
            <MenuItem value="none">None</MenuItem>
            {monitorNodes.map(node => (
              <MenuItem value={node.nodeId}>{node.name}</MenuItem>
            ))}
          </Select>

          <Typography variant="subtitle2">Heater Nodes</Typography>
          {heaters.map((heater, index, array) => (
            <div style={{ display: 'flex' }}>
              <Select
                value={heater}
                onChange={e => this.handleHeaterChange(heater, e.target.value)}
                error={heater === 'error'}
                style={{ marginBottom: 15 }}
                fullWidth
              >
                <MenuItem value="none" />
                {heaterNodes.map(node => (
                  <MenuItem value={node.nodeId}>{node.name}</MenuItem>
                ))}
              </Select>
              {index === array.length - 1 ? (
                <AddCircle
                  onClick={this.addHeaterNode}
                  style={{ marginLeft: 10, cursor: 'pointer' }}
                />
              ) : (
                <RemoveCircle style={{ marginLeft: 10, cursor: 'pointer' }} />
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleCancel}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    nodes: state.nodes.data.nodes,
    nodesFetched: state.nodes.data.nodesFetched,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNodes: () => dispatch(fetchAllNodes()),
    assignNodes: (id, allNodes) => dispatch(setNodes(id, allNodes)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AssignNode),
);
