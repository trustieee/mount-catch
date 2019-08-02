import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Home} />
      </Switch>
    </div>
  );
};

export default App;
