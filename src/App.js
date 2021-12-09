import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './view/admin/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
  </Router>
  );
}

export default App;
