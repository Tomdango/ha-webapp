import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../../components/navigation';
import Dialogs from '../../components/dialogs';

const AreasView = React.lazy(() => import('../../views/AreasView'));
const NodesView = React.lazy(() => import('../../views/NodesView'));
const NodeControlView = React.lazy(() => import('../../views/NodeControlView'));
const SetupView = React.lazy(() => import('../../views/SetupView'));
const AreaConfigView = React.lazy(() => import('../../views/AreaConfigView'));

const Router = () => (
  <BrowserRouter>
    <Navigation />
    <Dialogs />
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route component={AreasView} path="/areas" exact />
        <Route component={AreaConfigView} path="/areas/:id" exact />
        <Route component={NodesView} path="/nodes" exact />
        <Route component={NodeControlView} path="/nodes/:id" exact />
        <Route component={SetupView} path="/setup" exact />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
