import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { Search as SearchIcon, Sort as SortIcon } from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import NavigationBar from '../modules/NavigationBar';
import PlaylistsContainer from "../modules/PlaylistsContainer";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: '5vh 20vh 10vh 20vh',
		display: "block",
		justifyContent: "center",
		width: "100%",
	},
	button: {
		fontWeight: "bold",
		fontFamily: "Arial Black",
		height: "100%"
	},
	sectionContainer: {
		paddingTop: '3vh',
		margin: '5vh 0 10vh 0',
		width: '100%',
		padding: '3vh',
		backgroundColor: '#999999',
	},
	title: {
		fontSize: '28pt',
	},
	query: {
		fontSize: '16pt',
	},
	importGrid: {
		maxWidth: "100%"
	},
	page: {
		height: "100%"
	}
}));

const api = 'http://localhost:42069/api';

function Search(props) {
	const classes = useStyles();
	const location = useLocation();
	const [sortAnchor, setSortAnchor] = useState(null);
	const [playlists, setPlaylists] = useState([]);
	
	const handleSortClick = (event) => {
		setSortAnchor(event.currentTarget);
	};
	
	const handleSortClose = () => {
		setSortAnchor(null);
	};
	
	useEffect(() => {
		fetchPlaylists();
	  }, [location.query]);

	const fetchPlaylists = async () => {
		if(location.query){
			let requestOptions = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			let response = await fetch(`${api}/mixtape/search/${location.query}`, requestOptions);
			if(response.status === 200) {
				let data = await response.json();
				setPlaylists(data);
			} else {
				alert(`failed to fetch data with error status ${response.status}`);
			}
		} else {
			setPlaylists([]);
		}	
	};


	return (
		<div className={classes.page}>
			<NavigationBar setUser={props.setUser} user={props.user} pageName='Search'></NavigationBar>
			
			<Grid container direction="row" justify="center" alignItems="center" fullWidth className={classes.container}>					
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item xs={12} sm={6}>
						<Typography variant="h3" className={classes.title}>
							Search results for: 
						</Typography>
					</Grid>
					
					<Grid item xs={12} sm={1} className={classes.importGrid}>
						<Button
						variant="contained"
						color="secondary"
						className={classes.button}
						aria-controls="sort-menu" aria-haspopup="true" onClick={handleSortClick}>
							<SortIcon fontSize='large'></SortIcon>
							{" Sort"}
						</Button>
						<Menu
							id="sort-menu"
							anchorEl={sortAnchor}
							keepMounted
							open={Boolean(sortAnchor)}
							onClose={handleSortClose}
						>
							<MenuItem onClick={handleSortClose}>By Title</MenuItem>
							<MenuItem onClick={handleSortClose}>By Duration</MenuItem>
							<MenuItem onClick={handleSortClose}>By Author</MenuItem>
						</Menu>
					</Grid> 
					
					<Grid item xs={12} sm={6}>
						<Typography className={classes.query}> 
							{location.query ? location.query : "No results found"}
						</Typography>
					</Grid>
				</Grid>
				
				<PlaylistsContainer height={700} playlists={playlists} fetchPlaylists={fetchPlaylists} user={props.user}/>
					
			</Grid>
		</div>
	);
}

export default Search;