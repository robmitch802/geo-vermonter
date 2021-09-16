import { removeTypeDuplicates } from '@babel/types';
import React from 'react';
import { 
        BrowserRouter as Router,
        Route 
    } from 'react-router-dom';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from '../Nav';
import Game from '../Game';
import Scores from '../Scores';
import Home from '../Home';
import Info from '../Info';

import * as ROUTES from '../../constants/routes';

const App = () => (
    <Router>
        <Navigation />
        <Route exact path = {ROUTES.HOME} component={Home} />
        <Route path={ROUTES.GAME} component={Game} />
        <Route path={ROUTES.SCORES} component={Scores} />
        <Route path={ROUTES.INFO} component={Info} />
    </Router>
);

export default App;