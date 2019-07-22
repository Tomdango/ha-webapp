import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as colors from '@material-ui/core/colors';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import BatchJobs from './presentation/functional/batch';
import './scss/App.scss';
import Router from './presentation/functional/router/Router';
import configureStore from './redux/configureStore';
import WebSocketConnections from './presentation/functional/websocket';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: colors.indigo,
  },
});

const App = () => {
  return (
    <Provider store={configureStore()}>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={6000}
          newestOnTop
          hideProgressBar
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <BatchJobs />
        <Router />
        <WebSocketConnections />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
