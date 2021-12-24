import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../home';
import Users from '../users';
import User from '../user';
import Keys from '../keys';
import Key from '../key';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/user' component={User} />
          <Route exact path='/user/:userId' component={User} />
          <Route exact path='/keys' component={Keys} />
          <Route exact path='/key' component={Key} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
