import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <Switch>
        <Route component={Home} />
      </Switch>
    </div>
  );
};

export default App;
