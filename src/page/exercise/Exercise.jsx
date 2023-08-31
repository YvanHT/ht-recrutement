import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Exercise.scss';

import Comment from '../../component/organic/pageUtil/exercise/form/Comment';
import Form from '../../component/organic/pageUtil/exercise/form/Form';
import Info from '../../component/organic/pageUtil/exercise/form/Info';

const Exercise = () => (
  <div className="exercise">
    <div className="exercise__title">
      <p>Exercice</p>
    </div>
    <div className="exercise__content">
      <Switch>
        <Route exact path="/exercice/form/:id/:ids?">
          <Form />
        </Route>
        <Route exact path="/exercice/comment/:id/:ids?">
          <Comment />
        </Route>
        <Route exact path="/exercice/info/">
          <Info />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Exercise;
