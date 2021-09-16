import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to = {ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to = {ROUTES.GAME} >Game</Link>
            </li>
            <li>
                <Link to = {ROUTES.SCORES} >Scores</Link>
            </li>
            <li>
                <Link to = {ROUTES.INFO} >Info</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;