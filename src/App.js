import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

 import HeaderComponent from "./admin/components/HeaderComponent";
 

// import NoMatch from './components/NoMatch';
// import UserProfile from './components/UserProfile';

function App() {
  return (
    <BrowserRouter>
			
    <div className="App">
      <HeaderComponent></HeaderComponent>
    </div>
  </BrowserRouter>
  );
}

export default App;
