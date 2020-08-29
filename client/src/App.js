import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routes/MainRouter';
import Auth from './context/AuthContext';

function App() {

	const storedTokens = JSON.parse(localStorage.getItem("tokens"));
	const [authTokens, setAuthTokens] = useState(storedTokens);

	const setTokens = data => {
		localStorage.setItem("tokens", JSON.stringify(data));
		setAuthTokens(data);
	}

	return (
		<div className="App" style={styles.container}>
			<BrowserRouter>
				<Auth>
					<MainRouter/>
				</Auth>
			</BrowserRouter>
		</div>
	);
}

const styles = {
	container: {
		width: '100%',
		height: '100%',
	},
};

export default App;