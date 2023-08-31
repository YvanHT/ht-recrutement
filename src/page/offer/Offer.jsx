import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Offer.scss';

import List from '../../component/organic/pageUtil/offer/list/List';
import Form from '../../component/organic/pageUtil/offer/form/Form';
import Info from '../../component/organic/pageUtil/offer/info/Info';

const Offer = () => (
  <div className="offer">
    <div className="offer__title">
      <p>Offre</p>
    </div>
    <div className="offer__content">
      <Switch>
        <Route exact path="/offer">
          <List />
        </Route>
        <Route exact path="/offer/form">
          <Form />
        </Route>
        <Route exact path="/offer/form/:id">
          <Form />
        </Route>
        <Route exact path="/offer/info/:id">
          <Info />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Offer;
