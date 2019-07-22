import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@material-ui/core';
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
  useCircularInputContext,
} from 'react-circular-input';

const CustomComponent = () => {
  const { center, value } = useCircularInputContext();
  return (
    <text
      x={center.x}
      y={center.y + 15}
      fill="#fafafa"
      style={{
        fontFamily: 'Roboto',
        fontSize: 50,
        textAnchor: 'middle',
        pointerEvents: 'none',
      }}
    >
      {((value / 5) * 100 + 10).toFixed(1)}°C
    </text>
  );
};

const SetTemperature = ({
  onChange,
  onClose,
  open,
  onSubmit,
  initialValue = 10,
}) => {
  const [value, setValue] = React.useState((initialValue - 10) / 20);
  let previousRaw = 0;

  const floor = (oldValue, newValue) => {
    if (previousRaw > 0.975 && newValue < 0.1) {
      if (onChange) {
        onChange(30.0);
      }
      return 1;
    }
    previousRaw = newValue;
    const flooredValue = Math.floor(newValue * 40) / 40;
    if (onChange) {
      onChange(((value / 5) * 100 + 10).toFixed(1));
    }
    return flooredValue;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Set Temperature</DialogTitle>
      <DialogContent>
        <div style={{ padding: 25, marginBottom: 50 }}>
          <CircularInput
            value={value}
            onChange={newValue => setValue(floor(value, newValue))}
          >
            <CircularTrack />
            <CircularProgress
              stroke={`rgb(${value * 127.5 + 127.5}, ${200 -
                value * 200}, ${255 - value * 255})`}
            />
            <CircularThumb fill="#777" />
            <CustomComponent />
          </CircularInput>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginBottom: 10 }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            style={{ marginLeft: 10, marginBottom: 10 }}
            onClick={() => onSubmit(((value / 5) * 100 + 10).toFixed(1))}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetTemperature;
