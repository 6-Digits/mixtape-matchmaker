import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
// import logo from "./logo.svg";
import "./App.css";
import Login from "./components/pages/Login"
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import ForgotPassword from "./components/pages/ForgotPassword"
import SignUp from "./components/pages/SignUp"
import MyPlaylist from "./components/pages/MyPlaylist"
import Matches from "./components/pages/Matches"
import Settings from "./components/pages/Settings"
import Notifications from "./components/pages/Notifications"
import {CssBaseline, Paper} from '@material-ui/core';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles"

let checkUserStatus = () => {
    return null;
};
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#6aabc4",
		},
		secondary: {
			main: "#6aabc4",
		},
		type: "dark"
	}
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "app not working" 
        };
        // this.user = checkUserStatus();
        // this.user = False;
    }
    
    callAPI() {
        fetch("http://localhost:42069", { mode: 'no-cors' })
            .then(response => response.text())
            .then(data => {
                this.setState({ apiResponse: data });
                console.log('data=' + data);
            })
            .catch(error => error);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
			<ThemeProvider theme={theme}>
				<Paper>
				<BrowserRouter>
					{/* {user ? 
					<Redirect exact from="/" to={{ pathname: "/home" }} /> : <Redirect exact from="/" to={{ pathname: "/login" }} />} */}
					<Route path="/login" name="Login" render={(props) =>
						<Login/>}
					/>
					<Route />
					<Route path="/signup" name="SignUp" render={(props) =>
						<SignUp/>}
					/>
					<Route />
					<Route path="/home" name="Home" render={(props) =>
						<Home/>}
					/>
					<Route path="/about" name="About" render={(props) =>
						<About/>}
					/>
					<Route />
					<Route path="/forgotpassword" name="Forgot Password" render={(props) =>
						<ForgotPassword/>}
					/>
					<Route />
					<Route path="/myplaylist" name="My Playlists" render={(props) =>
						<MyPlaylist/>}
					/>
					<Route />
					<Route path="/matches" name="My Matches" render={(props) =>
						<Matches/>}
					/>
					<Route />
					<Route path="/settings" name="My Settings" render={(props) =>
						<Settings/>}
					/>
					<Route />
					<Route path="/notifications" name="My Notifications" render={(props) =>
						<Notifications/>}
					/>
					<Route />
				</BrowserRouter>
				</Paper>
			</ThemeProvider>
        );
    }
}

export default App;
