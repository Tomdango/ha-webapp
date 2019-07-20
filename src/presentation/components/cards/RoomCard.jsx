import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchNodeInfo } from '../../../redux/actions/nodeActions';

class RoomCard extends Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    area: PropTypes.string.isRequired,
    setActiveNode: PropTypes.func.isRequired,
  };

  setActiveNode = (id, name) => {
    const { setActiveNode } = this.props;
    setActiveNode(id, name);
  };

  render() {
    const { area, nodes } = this.props;
    return (
      <Fade in>
        <Paper className="nodes-table-paper">
          <Typography
            style={{ padding: 15, fontWeight: 'lighter' }}
            variant="h5"
          >
            {area}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {nodes.map(data => (
                <TableRow>
                  <TableCell
                    style={{ display: 'flex', alignItems: 'center' }}
                    component="th"
                    scope="row"
                  >
                    <div
                      className={`nodetable-status nodetable-status__${
                        data.online ? 'online' : 'offline'
                      }`}
                    />
                    {data.name}
                  </TableCell>
                  <TableCell>{data.type}</TableCell>
                  <TableCell
                    align="right"
                    style={{ padding: 0, paddingRight: 10 }}
                  >
                    <Link
                      to={`/nodes/${data.id}`}
                      onClick={() => this.setActiveNode(data.id, data.name)}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button variant="outlined" size="small">
                        Control
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fade>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActiveNode: (id, name) => dispatch(fetchNodeInfo(id, name)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(RoomCard);
