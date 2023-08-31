import React from 'react';
import HTTheme from '@ht-kits/react/ht-kit/theme/HTTheme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';

import Authentication from './page/authentication/Authentication';
import Connected from './layout/connected/Connected';
import Candidate from './page/candidate/Candidate';
import Technology from './page/technology/Technology';
import Offer from './page/offer/Offer';
import User from './page/user/User';
import Diploma from './page/diploma/Diploma';
import TypeTechnology from './page/typeTechnology/TypeTechnology';
import Language from './page/language/Language';
import Error from './page/error/Error';
import Exercise from './page/exercise/Exercise';

const App = () => (
  <div className="App">
    <HTTheme>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Authentication />
          </Route>
          <Connected>
            <Switch>
              <Route exact path="/candidate/:path?/:id?">
                <Candidate />
              </Route>
              <Route exact path="/technology/:path?/:id?">
                <Technology />
              </Route>
              <Route exact path="/user/:path?/:id?">
                <User />
              </Route>
              <Route exact path="/diploma/:path?/:id?">
                <Diploma />
              </Route>
              <Route exact path="/type/technology/:path?/:id?">
                <TypeTechnology />
              </Route>
              <Route exact path="/language/:path?/:id?">
                <Language />
              </Route>
              <Route exact path="/error">
                <Error />
              </Route>
              <Route exact path="/exercice/:path?/:id?/:ids?">
                <Exercise />
              </Route>
              <Route exact path="/offer/:path?/:id?">
                <Offer />
              </Route>
              <Route exact path="*">
                <p>404 not found</p>
              </Route>
            </Switch>
          </Connected>
        </Switch>
      </BrowserRouter>
    </HTTheme>
  </div>
);

export default App;
