import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Language.scss';

import Form from '../../component/organic/pageUtil/language/form/Form';
import List from '../../component/organic/pageUtil/language/list/List';

const Language = () => (
  <div className="language">
    <div className="language__title">
      <p>Langue</p>
    </div>
    <div className="language__content">
      <Switch>
        <Route exact path="/language">
          <List />
        </Route>
        <Route exact path="/language/form">
          <Form />
        </Route>
        <Route exact path="/language/form/:id">
          <Form />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Language;
