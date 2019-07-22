import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import axios from 'axios';
import { red, blue } from '@material-ui/core/colors';
import { Autorenew } from '@material-ui/icons';
import { area } from '../../../core/constants/routes';

class TempHistoryPanel extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      dataLoaded: false,
      tempHistory: [],
      error: 0,
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    this.setState({ dataLoaded: false, tempHistory: [], error: 0 });
    const { id } = this.props;
    axios
      .get(area.tempHistory(id))
      .then(response => {
        const { humHistory, tempHistory } = response.data;
        this.setState({
          dataLoaded: true,
          tempHistory,
          humHistory,
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({ dataLoaded: true, error: 404 });
        } else {
          this.setState({ dataLoaded: true, error: 500 });
        }
      });
  };

  convertData = () => {
    const { tempHistory, humHistory } = this.state;
    const now = new Date();
    const parsedData = [];
    parsedData.push({ value: null, time: now.getTime() - 43200000 });
    tempHistory.reduce((previousPoint, point) => {
      const timeStart = new Date(point.start);
      if (timeStart.getTime() > now.getTime() - 43200000) {
        parsedData.push({
          'Temperature (°C)': point.temp,
          time: timeStart.getTime(),
        });
      }
      return point;
    });
    humHistory.reduce((previousPoint, point) => {
      const timeStart = new Date(point.start);
      if (timeStart.getTime() > now.getTime() - 43200000) {
        parsedData.push({
          'Humidity (%)': point.hum,
          time: timeStart.getTime(),
        });
      }
      return point;
    });
    return parsedData;
  };

  render() {
    const { dataLoaded, error } = this.state;
    if (!dataLoaded) {
      return (
        <Paper style={{ width: '100%', marginTop: 20 }}>
          <div style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Loading...
            </Typography>
          </div>
        </Paper>
      );
    }
    if (error === 404) {
      return (
        <Paper style={{ width: '100%', marginTop: 20 }}>
          <div style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              No History.
            </Typography>
          </div>
        </Paper>
      );
    }
    if (error === 500) {
      return (
        <Paper style={{ width: '100%', marginTop: 20 }}>
          <div style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Failed to load history.
            </Typography>
          </div>
        </Paper>
      );
    }
    return (
      <Paper style={{ width: '100%', marginTop: 20 }}>
        <div style={{ padding: 20 }}>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}
          >
            <Typography variant="h5">12 Hour History</Typography>
            <Autorenew
              style={{ cursor: 'pointer', marginLeft: 10 }}
              onClick={this.reload}
            />
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={this.convertData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                domain={['dataMin', 'auto']}
                name="Time"
                scale="linear"
                tickFormatter={unixTime => moment(unixTime).format('HH:mm')}
                type="number"
              />
              <YAxis type="number" domain={[0, 100]} allowDecimals />
              <Tooltip />
              <Legend />
              <Line
                type="linear"
                dot={false}
                dataKey="Temperature (°C)"
                strokeWidth={3}
                stroke={red[500]}
              />
              <Line
                type="linear"
                dataKey="Humidity (%)"
                strokeWidth={2}
                dot={false}
                stroke={blue[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    );
  }
}

export default TempHistoryPanel;
