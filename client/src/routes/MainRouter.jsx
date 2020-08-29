import React from 'react';
import {Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import NonAuthRoute from './NonAuthRoute';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';

function MainRouter() {
    return (
        <div>
            <Switch>
                <NonAuthRoute exact path="/" component={HomeView}/>
                <NonAuthRoute exact path="/login" component={LoginView}/>
                <NonAuthRoute exact path="/register" component={RegisterView}/>
            </Switch>
        </div>
    )
}

export default MainRouter