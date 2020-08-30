import React from 'react';
import {Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import NonAuthRoute from './NonAuthRoute';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import AddBusiness from '../views/AddBusiness';

function MainRouter() {
    return (
        <div>
            <Switch>
                <PrivateRoute exact path="/" component={HomeView}/>
                <PrivateRoute exact path="/addBusiness" component={AddBusiness}/>
                <NonAuthRoute exact path="/login" component={LoginView}/>
                <NonAuthRoute exact path="/register" component={RegisterView}/>
            </Switch>
        </div>
    )
}

export default MainRouter