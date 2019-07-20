import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
  Switch,
} from '@material-ui/core';
import { Label, Waves, Pause } from '@material-ui/icons';

const NodeConfigPanel = ({
  areaData,
  targetTemperature,
  openDialog,
  handleToggle,
  handleDeleteArea,
  heatingEnabled,
}) => (
  <Paper>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell
            padding="checkbox"
            style={{
              width: 'inherit',
              paddingLeft: 20,
            }}
          >
            <Label />
          </TableCell>
          <TableCell>
            <Typography color="textPrimary">Name</Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary">{areaData.name}</Typography>
          </TableCell>
          <TableCell align="right">
            <Button fullWidth>Change</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              width: 'inherit',
              paddingLeft: 20,
            }}
            padding="checkbox"
          >
            <Waves />
          </TableCell>
          <TableCell>
            <Typography color="textPrimary">Target</Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary">
              {targetTemperature ? `${targetTemperature}°C` : 'Unset'}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Button fullWidth onClick={() => openDialog('setTemperature')}>
              Set
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              width: 'inherit',
              paddingLeft: 20,
            }}
            padding="checkbox"
          >
            <Pause />
          </TableCell>
          <TableCell>
            <Typography color="textPrimary">Enabled</Typography>
          </TableCell>
          <TableCell />
          <TableCell
            align="right"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Switch
              style={{
                align: 'center',
              }}
              edge="start"
              checked={areaData.heatingEnabled}
              onChange={handleToggle} // checked
              value="heaterEnabled"
              inputProps={{
                'aria-labelledby': 'switch-list-label-wifi',
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              width: 'inherit',
              paddingLeft: 20,
            }}
            padding="checkbox"
          >
            <Pause />
          </TableCell>
          <TableCell>
            <Typography color="textPrimary">Delete</Typography>
          </TableCell>
          <TableCell />
          <TableCell
            align="right"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleDeleteArea}
            >
              Delete
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>
);

export default NodeConfigPanel;
