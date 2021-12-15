import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './view/login';
import Dashboard from './view/admin/Dashboard';
import User from './view/admin/pages/user';
import Scooter from './view/admin/pages/scooter';
import UserDetail from './view/admin/pages/userDetail';
import City from './view/admin/pages/city';
import Station from './view/admin/pages/station';

function App() {
  return (
   <Router>
     <Switch>
       <Route path="/" exact component={SignIn} />
       <Route path="/dashboard" exact component={Dashboard} />
       <Route path="/dashboard/user" exact component={User} />
       <Route path="/dashboard/user/:id" component={UserDetail} />
       <Route path="/dashboard/scooter" exact component={City} />
       <Route path="/dashboard/scooter/city/:id" component={Station} />
     </Switch>
   </Router>
  );
}

export default App;
