import React from 'react';
import {
  TableCell,
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  ButtonGroup,
} from '@material-ui/core';

const RoutineSetupPanel = ({ areaData, openDialog, deleteRoutine, style }) => (
  <Paper>
    <div
      style={{
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">Routines</Typography>
      <Button
        onClick={() => openDialog('addRoutine')}
        variant="contained"
        color="secondary"
      >
        Add
      </Button>
    </div>
    {areaData.routines && areaData.routines.length > 0 ? (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {/* <TableCell>Repeat</TableCell> */}
            <TableCell>Time</TableCell>
            {/* <TableCell align="right">Heating</TableCell> */}
            <TableCell align="right">Target</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {areaData.routines.map(routine => {
            const timeStart = new Date(routine.timeStart);
            const timeEnd = new Date(routine.timeEnd);
            return (
              <TableRow>
                <TableCell>{routine.name}</TableCell>
                {/* <TableCell>
                  {routine.repeat.map((item, index, array) => {
                    return `${item
                      .substring(0, 1)
                      .toUpperCase()}${item.substring(1, 2)}`;
                  })}
                </TableCell> */}
                <TableCell>
                  {timeStart
                    .getHours()
                    .toString()
                    .padStart(2, '0')
                    .padEnd(2, '0')}
                  :
                  {timeStart
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')
                    .padEnd(2, '0')}{' '}
                  -{' '}
                  {timeEnd
                    .getHours()
                    .toString()
                    .padStart(2, '0')
                    .padEnd(2, '0')}
                  :
                  {timeEnd
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')
                    .padEnd(2, '0')}
                </TableCell>
                {/* <TableCell align="right">
                  {routine.heatingEnabled ? 'Y' : 'N'}
                </TableCell> */}
                <TableCell align="right">
                  {routine.targetTemperature
                    ? `${routine.targetTemperature}°C`
                    : '-'}
                </TableCell>
                <TableCell align="right">
                  <ButtonGroup fullWidth variant="outlined">
                    <Button size="small">Edit</Button>
                    <Button
                      size="small"
                      onClick={() =>
                        // eslint-disable-next-line no-underscore-dangle
                        deleteRoutine(routine._id)
                      }
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    ) : null}
  </Paper>
);

export default RoutineSetupPanel;
