import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Candidate.scss';

import List from '../../component/organic/pageUtil/candidate/list/List';
import Info from '../../component/organic/pageUtil/candidate/info/Info';

const Candidate = () => (
  <div className="candidate">
    <div className="candidate__title">
      <p>Candidat</p>
    </div>
    <div className="candidate__content">
      <Switch>
        <Route exact path="/candidate">
          <List />
        </Route>
        <Route exact path="/candidate/info/:id">
          <Info />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Candidate;
