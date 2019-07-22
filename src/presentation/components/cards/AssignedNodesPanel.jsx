import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import { yellow } from '@material-ui/core/colors';

const AssignedNodesPanel = ({ areaData, openDialog, nodes }) => {
  const [hasMonitor, hasActuator] = areaData.registeredNodes.reduce(
    (previous, node) => {
      let isMonitor = false;
      let isActuator = false;
      const [monitor, actuator] = previous;
      const [foundNode] = nodes.filter(n => n.nodeId === node);
      if (foundNode) {
        if (foundNode.type === 'monitor') {
          isMonitor = true;
        }
        if (foundNode.type === 'heater') {
          isActuator = true;
        }
      }
      return [monitor || isMonitor, actuator || isActuator];
    },
    [false, false],
  );
  return (
    <Paper style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>
      <div style={{ padding: 20 }}>
        <div
          style={{
            marginBottom: 10,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h5">Assigned Nodes</Typography>
          <Button
            onClick={() => openDialog('assignNode')}
            variant="contained"
            color="secondary"
          >
            Assign
          </Button>
        </div>
        {hasMonitor ? null : (
          <Typography
            gutterBottom
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Warning style={{ color: yellow[900] }} />
            This area does not have a monitor node.
          </Typography>
        )}
        {hasActuator ? null : (
          <Typography style={{ display: 'flex', alignItems: 'center' }}>
            <Warning style={{ color: yellow[900] }} />
            This area has no actuators.
          </Typography>
        )}
      </div>
      {areaData.registeredNodes.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {areaData.registeredNodes.map(node => {
              const filteredNodes = nodes.filter(n => node === n.nodeId);
              if (filteredNodes.length !== 1) return null;
              const nodeData = filteredNodes[0];
              return (
                <TableRow>
                  <TableCell>{nodeData.nodeId.split('-')[0]}</TableCell>
                  <TableCell>{nodeData.name}</TableCell>
                  <TableCell>
                    {nodeData.type[0].toUpperCase()}
                    {nodeData.type.substring(1)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : null}
    </Paper>
  );
};

export default AssignedNodesPanel;
