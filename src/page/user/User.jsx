import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './User.scss';

import List from '../../component/organic/pageUtil/user/list/List';
import Info from '../../component/organic/pageUtil/user/info/Info';

const User = () => (
  <div className="user">
    <div className="user__title">
      <p>Utilisateur</p>
    </div>
    <div className="user__content">
      <Switch>
        <Route exact path="/user">
          <List />
        </Route>
        <Route exact path="/user/info/:id">
          <Info />
        </Route>
      </Switch>
    </div>
  </div>
);

export default User;
