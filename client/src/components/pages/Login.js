import React, { useState, useEffect } from "react";
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assets/logo.png";
import { Redirect } from 'react-router-dom';
import ForgotPassword from "../modals/ForgotPassword";
import Footer from "../modules/Footer"

function Login({user, setUser}) {
	const useStyles = makeStyles((theme) => ({
		form: {
		  width: '100%'
		},
		submit: {
		  margin: theme.spacing(3, 0, 2),
		  fontWeight: "bold",
		  fontFamily: "Arial Black"
		},
		headerButton: {
			fontSize: 2.5	 + 'rem'
		},
		content: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "80vh" ,
		},
		logo: {
			display: "flex",
			margin: "auto",
			height: "25vh",
			width: "25vh"
		},
		container: {
			height: "100vh"
		}
	  }));
	const classes = useStyles();
	return (
	   <Container component="main" maxWidth="lg" className={classes.container}>
		<div className={classes.content}>
			<Container>
				<img src={logo} className={classes.logo}/>
				<form className={classes.form} noValidate>
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
				href="/home"
				>
				Log In
				</Button>
				<Grid 
				container
				direction="row"
				justify="space-between"
				alignItems="center">
					<ForgotPassword/>
					<Link href="/signup" variant="body2">
					{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</form>
		  </Container>
		</div>
		<Footer></Footer>
	  </Container>
	);
}

export default Login;