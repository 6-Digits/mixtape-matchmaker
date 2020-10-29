import React, { useState, useEffect} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Container, Grid, Typography, InputBase, IconButton, TextField, GridList, Button } from '@material-ui/core';
import { TurnedInNot, Search as SearchIcon } from "@material-ui/icons";
import ReactPlayer from 'react-player/youtube';
import Draggable from 'react-draggable';
import NavigationBar from '../modules/NavigationBar';
import Playlist from "../modules/Playlist";
import MatchSettings from "../modals/MatchSettings";
import GoMatch from "../modals/GoMatch";
import ViewMatch from "../modals/ViewMatch";

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%'
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black",
		fontSize: "1.5rem"
	},
	content: {
		marginTop: "5vh",
	},
	fullHeight: {
		height: "100%"
	},
	playlistEdit: {
		marginTop: "1rem",
		padding: "0 0 2vh 0"
	}
}));

function Matches(props) {
	const classes = useStyles();
	const [width, setWidth] = useState(0);
	
	useEffect(() => {
		function updateWidth() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateWidth);
		updateWidth();
		return () => window.removeEventListener('resize', updateWidth);
	  }, []);
	
	
	return (
		<div style={{height: width > 599 ? "100vh" : "100%"}}>
			<NavigationBar pageName='My Matches'></NavigationBar>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className={classes.content}
			>
				<Grid 
					container
					direction="column"
					justify="space-evenly"
					alignItems="center"
					item xs={12} sm={4}
					spacing={1}
					style={{marginTop: width > 599 ? "4rem" : "0"}}>
					<Grid container item xs={12} sm={11}>	
						<ReactPlayer className={classes.player} url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
					</Grid>
					<Grid container item xs={12} sm={11}
						direction="column"
						justify="center"
						alignItems="center">	
						<Grid container item xs={12} fullWidth>
							<MatchSettings></MatchSettings>
						</Grid>
						<Grid container item xs={12} fullWidth>
							<GoMatch></GoMatch>
						</Grid>
						<Grid container item xs={12} fullWidth>
							<ViewMatch></ViewMatch>
						</Grid>
					</Grid>
				</Grid>
				<Grid container item xs={12} sm={7}>
					<Playlist title="My Match Playlist" importable={true} editable={true} draggable={true}/>
					<Grid
						container
						direction="column"
						justify="space-evenly"
						alignItems="center"
						spacing={4}
						className={classes.playlistEdit}
						>
						<Grid container item xs={12} spacing={3}>	  
							<TextField 	
							fullWidth
							id="playlist-title" 
							label="Title of Match Playlist" 
							variant="outlined" />
						</Grid>

						<Grid container item xs={12} spacing={3}>
							<TextField 
							fullWidth
							id="playlist-desc" 
							label="Description of Match Playlist" 
							multiline
							rows={8}
							variant="outlined" />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default Matches;