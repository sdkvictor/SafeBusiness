import React, { Component } from 'react';
import colors from '../constants/colors'

class BusinessExist extends Component {
    render(){
        return (
        <div>
            <span className = "btn">Add</span>
        </div>
        );

    }
}

class TopBarMenu extends Component {
    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={styles.bar}>
                    <a class="navbar-brand" href="#">Safe Business</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Mi negocio..." aria-label="Buscar"></input>
                     .   <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                        </form>
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Log out</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

const styles = {
    bar: {
        backgroundColor: colors.primary
    }
}


export default TopBarMenu;