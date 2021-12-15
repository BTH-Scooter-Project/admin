import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './view/login';
import Dashboard from './view/admin/Dashboard';
import User from './view/admin/pages/user';
import Scooter from './view/admin/pages/scooter';
import Log from './view/admin/pages/log';
import UserDetail from './view/admin/pages/userDetail';

function App() {
  return (
   <Router>
     <Switch>
       <Route path="/" exact component={SignIn} />
       <Route path="/dashboard" exact component={Dashboard} />
       <Route path="/dashboard/user" exact component={User} />
       <Route path="/dashboard/scooter" component={Scooter} />
       <Route path="/dashboard/log" component={Log} />
       <Route path="/dashboard/user/:id" component={UserDetail} />
     </Switch>
   </Router>
  );
}

export default App;
