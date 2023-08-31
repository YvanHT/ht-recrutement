import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './TypeTechnology.scss';

import List from '../../component/organic/pageUtil/typeTechnology/list/List';
import Form from '../../component/organic/pageUtil/typeTechnology/form/Form';

const TypeTechnology = () => (
  <div className="type">
    <div className="type__title">
      <p>Catégories de technologie</p>
    </div>
    <div className="type__content">
      <Switch>
        <Route exact path="/type/technology">
          <List />
        </Route>
        <Route exact path="/type/technology/form">
          <Form />
        </Route>
        <Route exact path="/type/technology/form/:id">
          <Form />
        </Route>
      </Switch>
    </div>
  </div>
);

export default TypeTechnology;
