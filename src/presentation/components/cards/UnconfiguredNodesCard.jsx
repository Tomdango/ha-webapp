import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { startNodeSetup as startNodeSetupAction } from '../../../redux/actions/nodeActions';

class UnconfiguredNodesCard extends Component {
  static propTypes = {
    uninitializedNodes: PropTypes.arrayOf(PropTypes.Object).isRequired,
    startNodeSetup: PropTypes.func.isRequired,
  };

  handleSetupClick = id => {
    const { startNodeSetup } = this.props;
    startNodeSetup(id);
  };

  render() {
    const { uninitializedNodes } = this.props;
    return (
      <Paper style={{ width: '100%' }}>
        <Typography
          variant="h5"
          style={{ fontWeight: 'lighter', padding: 15 }}
          gutterBottom
        >
          Unconfigured Nodes
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Discovered</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {uninitializedNodes.map(node => {
              const time = new Date(node.createdAt);
              const hours = time
                .getHours()
                .toString()
                .padStart(2, '0');
              const minutes = time
                .getMinutes()
                .toString()
                .padStart(2, '0');
              const seconds = time
                .getSeconds()
                .toString()
                .padStart(2, '0');
              const formattedTime = `${hours}:${minutes}:${seconds}`;
              return (
                <TableRow>
                  <TableCell>{node.nodeId.split('-')[0]}</TableCell>
                  <TableCell>
                    {node.type.substring(0, 1).toUpperCase()}
                    {node.type.substring(1)}
                  </TableCell>
                  <TableCell>{formattedTime}</TableCell>
                  <TableCell
                    align="right"
                    padding="checkbox"
                    style={{ padding: 0, paddingRight: 10 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => this.handleSetupClick(node.nodeId)}
                      size="small"
                    >
                      Setup
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    uninitializedNodes: state.nodes.discovery.uninitializedNodes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startNodeSetup: id => dispatch(startNodeSetupAction(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconfiguredNodesCard);
