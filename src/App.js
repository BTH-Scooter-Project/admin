import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './view/admin/Dashboard';
import User from './view/admin/pages/user';
import Scooter from './view/admin/pages/scooter';
import Log from './view/admin/pages/log';

function App() {
  return (
   <Router>
     <Switch>
       <Route path="/" exact component={Dashboard} />
       <Route path="/dashboard/user" component={User} />
       <Route path="/dashboard/scooter" component={Scooter} />
       <Route path="/dashboard/log" component={Log} />
     </Switch>
   </Router>
  );
}

export default App;
