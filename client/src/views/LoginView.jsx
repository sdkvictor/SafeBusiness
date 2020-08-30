import React, {useState, useEffect, useContext} from 'react';
import { useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import colors from '../constants/colors'

import {AuthContext} from '../context/AuthContext';

function Copyright() {
	return (
	  <Typography variant="body2" color="textSecondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://material-ui.com/">
		  Your Website
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }

function LoginView(props) {


	const { login } = useContext(AuthContext);
	const history = useHistory();

	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
	
    const onEmailChange = event => {
		setEmail(event.target.value);
    }

    const onPasswordChange = event => {
        setPassword(event.target.value);
	}
	
	const postLogin = (e) => {
		e.preventDefault();
		console.log(email);
		console.log(password);
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

	const classes = useStyles();

  	return (
		  <div className={classes.container}>
		<Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={postLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
			autoFocus
			onChange={onEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
			autoComplete="current-password"
			onChange={onPasswordChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
			<Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
	</div>
	)
}

const useStyles = makeStyles((theme) => ({
	paper: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	avatar: {
	  margin: theme.spacing(1),
	  backgroundColor: theme.palette.secondary.main,
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  marginTop: theme.spacing(1),
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	},
	container: {
		width: '100%',
		height: '100%',
		position: "fixed",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.light
	}
  }));

export default LoginView;