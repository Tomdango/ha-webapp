import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';
import { withRouter } from 'react-router-dom';
import { homepage } from '../../../../package.json';

const AreaCard = ({
  areaId,
  history,
  name,
  temperature,
  targetTemperature,
  humidity,
}) => {
  let hotOrCold = '';
  let temperatureDiff = 0;
  if (targetTemperature > temperature) {
    hotOrCold = 'cold';
    temperatureDiff = targetTemperature - temperature;
  } else if (targetTemperature <= temperature) {
    hotOrCold = 'hot';
    temperatureDiff = temperature - targetTemperature;
  }
  const handleSettingsClick = () => {
    history.push(`${homepage}/areas/${areaId}`);
  };
  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="textSecondary" variant="overline" gutterBottom>
            {name}
          </Typography>
          <Typography variant="overline" color="textSecondary">
            {humidity}% Humidity
          </Typography>
          <SettingsIcon
            onClick={handleSettingsClick}
            className="settings-icon"
          />
        </div>
        <Typography variant="h2">
          {temperature === null ? '--.-' : Number(temperature).toFixed(1)}°C
        </Typography>
        <Typography variant="overline" color="textSecondary">
          {Number(temperatureDiff).toFixed(1)}°C{' '}
          {hotOrCold === 'hot' ? 'above' : 'below'} target (
          {Number(targetTemperature).toFixed(1)}°C)
        </Typography>
      </CardContent>
    </Card>
  );
};

AreaCard.propTypes = {
  name: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  targetTemperature: PropTypes.number.isRequired,
  areaId: PropTypes.string.isRequired,
};

export default withRouter(AreaCard);
