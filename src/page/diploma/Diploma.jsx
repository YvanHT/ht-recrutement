import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Diploma.scss';

import List from '../../component/organic/pageUtil/diploma/list/List';
import Form from '../../component/organic/pageUtil/diploma/form/Form';

const Diploma = () => (
  <div className="diploma">
    <div className="diploma__title">
      <p>Diplôme</p>
    </div>
    <div className="diploma__content">
      <Switch>
        <Route exact path="/diploma">
          <List />
        </Route>
        <Route exact path="/diploma/form">
          <Form />
        </Route>
        <Route exact path="/diploma/form/:id">
          <Form />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Diploma;
