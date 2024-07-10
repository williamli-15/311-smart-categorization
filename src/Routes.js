import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './pages/About';
import Frame1 from './pages/Frame1';
import Frame2 from './pages/Frame2';
import Frame3 from './pages/Frame3';
import Frame4 from './pages/Frame4';
import Frame5 from './pages/Frame5';
import Classify from './pages/Classify';
import NotFound from './pages/NotFound';

const Routes = ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={Classify} props={childProps} />
    <Route path="/about" exact component={About} props={childProps} />
    <Route path="/frame1" exact component={Frame1} props={childProps} />
    <Route path="/frame2" exact component={Frame2} props={childProps} />
    <Route path="/frame3" exact component={Frame3} props={childProps} />
    <Route path="/frame4" exact component={Frame4} props={childProps} />
    <Route path="/frame5" exact component={Frame5} props={childProps} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
