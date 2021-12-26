import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './view/login';
import Dashboard from './view/admin/Dashboard';
import User from './view/admin/pages/user';
import Scooter from './view/admin/pages/scooter';
import UserDetail from './view/admin/pages/userDetail';
import City from './view/admin/pages/city';
import Station from './view/admin/pages/station';
import Map from './view/admin/pages/map';
import PageSizeCustomOptions from './view/admin/pages/datagrid';

function App() {
  return (
   <Router>
     <Switch>
       <Route path="/" exact component={SignIn} />
       <Route path="/dashboard" exact component={Dashboard} />
       <Route path="/dashboard/user" exact component={User} />
       <Route path="/dashboard/user/:id" component={UserDetail} />
       <Route path="/dashboard/scooter" exact component={City} />
       <Route path="/dashboard/scooter/city/:id" exact component={Station} />
       <Route path="/dashboard/scooter/city/:id/station/:id" exact component={Scooter} />
       <Route path="/dashboard/map" exact component={Map} />
       <Route path="/dashboard/datagrid" exact component={PageSizeCustomOptions} />

     </Switch>
   </Router>
  );
}

export default App;
