import React, { useState, useEffect } from "react";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core"
import NavigationBar from '../modules/NavigationBar';
import PlaylistsContainer from "../modules/PlaylistsContainer";

const useStyles = makeStyles((theme)=>({
	mainContainer: {
		padding: '5vh 20vh 10vh 20vh',
		display: "block",
		justifyContent: "center",
		width: "100%",
	},
	popularTitle: {
		fontSize: '28pt',
	},
	likedTitle: {
		fontSize: '28pt',
		marginTop: '7vh',
	},
	sectionContainer: {
		paddingTop: '3vh',
		margin: '5vh 0 10vh 0',
		width: '100%',
		padding: '3vh',
		backgroundColor: '#999999',
	},
	playlistsContainer: {
		padding: "20px 20px 20px 20px",
	},
	cardMedia: {
		margin: "auto",
		width: "120px", 
		height: "100px",
	},
	cardContent: {
		textAlign: "justify",
	},
	cardAction: {
		display: 'block',
		textAlign: 'initial',
		margin: '2px',
	}
}));

const popConst = Array(20).fill('Popular Tape').map((x, i) => ({
	title: x + ' ' + i,
	thumbnail: "https://i.kym-cdn.com/entries/icons/original/000/029/079/hellothere.jpg",
	editable: false
}));

const likeConst = Array(20).fill('Liked Tape').map((x, i) => ({
	title: x + ' ' + i,
	thumbnail: "https://i.kym-cdn.com/entries/icons/facebook/000/028/875/cover4.jpg",
	editable: false
}));

function Home({user, setUser}) {
	const classes = useStyles();

	const [popularPlaylists, setPopularPlaylists] = useState([]);
	const [likedPlaylists, setLikedPlaylists] = useState([]);
	
	const fetchPopularPlaylists = () => {
		setPopularPlaylists([null, null, null]);
	};

	const fetchLikedPlaylists = () => {
		setLikedPlaylists([null, null, null]);
	};

	return (
		<div>
			<NavigationBar setUser={setUser} user={user} pageName='Home'></NavigationBar>
			
			<Grid container direction="row" justify="center" alignItems="center" fullWidth className={classes.mainContainer}>
				
				<Typography variant="h3" className={classes.popularTitle}>
					Popular Playlists
				</Typography>
				
				<PlaylistsContainer height={700} playlists={popularPlaylists} user={user} fetchPlaylists={fetchPopularPlaylists} />
				
				<Typography variant="h3" className={classes.likedTitle}>
					Liked Playlists
				</Typography>
				
				<PlaylistsContainer height={700} playlists={likedPlaylists} user={user} fetchPlaylists={fetchLikedPlaylists}/>
				
			</Grid>
		</div>
	);
}

export default Home;