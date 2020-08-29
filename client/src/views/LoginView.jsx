import React, {useState, useEffect, useContext} from 'react';
import { useHistory} from 'react-router-dom';

import {AuthContext} from '../context/AuthContext';


function LoginView(props) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login } = useContext(AuthContext);
	const history = useHistory();
	
    const onEmailChange = event => {
        setEmail(event.target.value);
    }

    const onPasswordChange = event => {
        setPassword(event.target.value);
	}
	
	const postLogin = (e) => {
		e.preventDefault();
		login({email, password})
			.then(success => {
				if (success) {
					history.push('/');
				} else {
					console.log('authentication failed');
				}
			})
			.catch(error => {
				
				console.log('authentication failed catch ', error);
			})
	}

  	return (
		<div>
            <p>Login Screen</p>
        </div>
	)
}

const styles = {
	container: {
        width: '100%'
    }
}

export default LoginView;