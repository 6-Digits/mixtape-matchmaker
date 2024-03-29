import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Drawer, List, Divider, ListItem, ListItemText, Button, ListItemIcon } from '@material-ui/core';
import { Menu as MenuIcon, Search as SearchIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import Notifications from "../modals/Notifications.js";
import AccountDropDown from "./AccountDropDown.js";
import logo from "../../assets/logo.png";
import HomeIcon from '@material-ui/icons/Home';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Settings as SettingsIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import InfoIcon from '@material-ui/icons/Info';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 2
	},
	toolbar: {
		margin: '1vh 0 1vh 0',
	},
	menuButton: {
		marginRight: theme.spacing(2),
		color: theme.palette.text.primary
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
		fontWeight: 'bold',
		color: theme.palette.text.primary
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
		color: theme.palette.text.primary
	},
	searchButton: {
		padding: theme.spacing(1, 1.5, 1, 1.5),
		transition: theme.transitions.create('width'),
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		fontWeight: 'bold',
		color: theme.palette.text.primary
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1.5, 1.5, 1.5, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '50ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	root: {
		display: 'flex',
	},
	appBar: {
		backgroundColor: theme.palette.background.default,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	logo: {
		display: "block",
		margin: 'auto',
		padding: "2vh 0 2vh 0",
		height: "10vh",
	},
	home: {
		display: "block",
		margin: '0 3vh 0 2vh',
		height: "5vh",
	}
}));


function NavigationBar(props) {
	const classes = useStyles();
	const [width, setWidth] = useState(0);
	const theme = useTheme();
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	useEffect(() => {
		function updateWidth() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateWidth);
		updateWidth();
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleSearch = () => {
		history.push({
			pathname: '/search',
			query: value
		});
	};

	const logout = () => {
		localStorage.clear();
		props.setUser(null);
	}
	return (
		<div className={classes.grow}>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
					>
						<MenuIcon />
					</IconButton>

					<a href='/home'>
						<img src={logo} className={classes.home} alt="logo" />
					</a>

					<Typography className={classes.title} variant="h5" noWrap>
						{props.pageName}
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							onChange={event => setValue(event.target.value)}
							onKeyDown={event => { if (event.key == 'Enter') handleSearch(); }}
						/>
					</div>
					<Button variant="contained" className={classes.searchButton} aria-label='search' onClick={handleSearch}>
						Search
					</Button>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Notifications user={props.user} notifications={props.notifications} setNotifications={props.setNotifications}/>
						<AccountDropDown setUser={props.setUser} user={props.user}/>
					</div>
				</Toolbar>
			</AppBar>

			<Drawer
				className={classes.drawer}
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
				ModalProps={{ onBackdropClick: handleDrawerClose }}
			>
				<div className={classes.drawerHeader}>
					<img src={logo} className={classes.logo} alt="logo" />
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>

				<Divider />
				<List>
					<ListItem button key='Home' component='a' href='/home'>
						<ListItemIcon><HomeIcon></HomeIcon></ListItemIcon>
						<ListItemText primary='Home'></ListItemText>
					</ListItem>
					<ListItem button key='My Playlists' component='a' href='/myplaylists'>
						<ListItemIcon><QueueMusicIcon></QueueMusicIcon></ListItemIcon>
						<ListItemText primary='My Playlists' />
					</ListItem>
					<ListItem button key='Matches' component='a' href='/matches'>
						<ListItemIcon><LoyaltyIcon></LoyaltyIcon></ListItemIcon>
						<ListItemText primary='Matches' />
					</ListItem>
					{width < 960 ? 
					<ListItem button key='Settings' component='a' href='/settings'>
						<ListItemIcon><SettingsIcon></SettingsIcon></ListItemIcon>
						<ListItemText primary='Settings' />
					</ListItem>: 
					null}
					{width < 960 ? 
					<ListItem button key='Logout' component='a' onClick={logout}>
						<ListItemIcon><ExitToAppIcon></ExitToAppIcon></ListItemIcon>
						<ListItemText primary='Logout' />
					</ListItem>: 
					null}
				</List>

				<Divider />
				<List>
					<ListItem button key='About' component='a' href='/about'>
						<ListItemIcon><InfoIcon></InfoIcon></ListItemIcon>
						<ListItemText primary='About' />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
}

export default NavigationBar;