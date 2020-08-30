import React, { useState, useEffect, useContext, Component } from "react";
import colors from '../constants/colors'
import { useHistory } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';



export default function TopBarMenu (props) {
    const history = useHistory();
const { logout } = useContext(AuthContext);

const onLogout = () => {
    logout();
    history.push('/login');
}

        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark " style={styles.bar}>
                    <a class="navbar-brand" href="#">Safe Business</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="basicExampleNav">
                        <form class="form-inline col-10 w-25">
                        <div class="md-form my-0  w-50">
                            <input class="form-control mr-sm-2 w-75" type="text" placeholder="My business..." aria-label="Search"></input>
                        </div>
                        </form >
                        <ul class="navbar-nav ml-auto text-right">
                            <li class="nav-item">
                            <button type="button" class="btn btn-secondary btn-md" style={styles.primary} onClick={onLogout}>Log out</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }


const styles = {
    bar: {
        backgroundColor: colors.dark
    },
    primary:{
        backgroundColor: colors.secondary
    }
}


