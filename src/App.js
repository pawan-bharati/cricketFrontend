import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
 import Register from './components/Register';
 import PrivateRoute from './components/PrivateRoute';
 import Dashboard from './components/Dashboard';
// import NoMatch from './components/NoMatch';
// import UserProfile from './components/UserProfile';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          { <Route path='/register' component={Register} /> }
          {<Route path='/dashboard' component={Dashboard} /> }
                   
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
