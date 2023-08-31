import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Technology.scss';

import List from '../../component/organic/pageUtil/technology/list/List';
import Form from '../../component/organic/pageUtil/technology/form/Form';
import Info from '../../component/organic/pageUtil/technology/info/Info';

const Technology = () => (
  <div className="technology">
    <div className="technology__title">
      <p>Technologies</p>
    </div>
    <div className="technology__content">
      <Switch>
        <Route exact path="/technology">
          <List />
        </Route>
        <Route exact path="/technology/form">
          <Form />
        </Route>
        <Route exact path="/technology/form/:id">
          <Form />
        </Route>
        <Route exact path="/technology/info/:id">
          <Info />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Technology;
