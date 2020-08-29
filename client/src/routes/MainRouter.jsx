import React from 'react';
import {Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import NonAuthRoute from './NonAuthRoute';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';

function MainRouter() {
    return (
        <div>
            <Switch>
                <PrivateRoute exact path="/" component={HomeView}/>
                <NonAuthRoute exact path="/login" component={LoginView}/>
            </Switch>
        </div>
    )
}

export default MainRouter