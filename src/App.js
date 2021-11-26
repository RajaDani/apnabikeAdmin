import AllRoutes from './Admin/AllRoutes';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <AllRoutes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
