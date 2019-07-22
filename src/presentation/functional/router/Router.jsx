import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../../components/navigation';
import Dialogs from '../../components/dialogs';
import { homepage } from '../../../../package.json';

const AreasView = React.lazy(() => import('../../views/AreasView'));
const NodesView = React.lazy(() => import('../../views/NodesView'));
const NodeControlView = React.lazy(() => import('../../views/NodeControlView'));
const SetupView = React.lazy(() => import('../../views/SetupView'));
const AreaConfigView = React.lazy(() => import('../../views/AreaConfigView'));
const RoutinesView = React.lazy(() => import('../../views/RoutinesView'));

const Router = () => (
  <BrowserRouter>
    <Navigation />
    <Dialogs />
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route component={AreasView} path={`${homepage}/areas`} exact />
        <Route
          component={AreaConfigView}
          path={`${homepage}/areas/:id`}
          exact
        />
        <Route component={NodesView} path={`${homepage}/nodes`} exact />
        <Route
          component={NodeControlView}
          path={`${homepage}/nodes/:id`}
          exact
        />
        <Route component={RoutinesView} path={`${homepage}/routines`} exact />
        <Route component={SetupView} path={`${homepage}/setup`} exact />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
