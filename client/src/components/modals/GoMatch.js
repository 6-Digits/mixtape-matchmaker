import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Dialog, DialogActions, Button, DialogTitle, Typography, Grid } from '@material-ui/core';
import { NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@material-ui/icons';
import { Media, Player, utils } from 'react-media-player'
import Playlist from "../modules/Playlist";
import PlayerControls from "../modules/PlayerControls";
import heart from "../../assets/heart.png";
import heartBreak from "../../assets/heart_break.png";
import placeholder from "../../assets/placeholder.png";

const { keyboardControls } = utils;

const useStyles = makeStyles((theme) => ({
	container: {
		width:"100%",
		height:"100%"
	},
	button: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black",
		fontSize: "1.5rem"
	},
	profileName: {
		textAlign: "center",
		marginTop: "1rem"
	},
	profileImg: {
		marginTop: '1rem',
		width: '15vh',
		height: '15vh',
		margin: 'auto'
	},
	modal: {
		margin: 'auto',
	},
	modalTitle: {
		fontSize: "3rem",
		fontWeight: "bold"
	},
	content: {
		width: "98%",
		margin: "1rem"
	},
	likeImg: {
		width: '10vh',
		height: '10vh'
	},
	playlistTitle: {
		textAlign: "center",
		marginTop: "1rem"
	},
	likeButton: { 
		marginTop: '1rem',
		backgroundColor: theme.palette.background.default
	},
	description: {
		height: '20vh',
		overflowY: 'auto',
		backgroundColor: theme.palette.background.paper,
		padding: '0.5rem',
		borderRadius: '0.25rem',
		marginTop: '1rem'
	},
	leftCard: {
		padding: "1rem",
		borderRadius: '0.5rem',
		backgroundColor: theme.palette.background.default,
	},
	rightCard: {
		padding: "0 1rem 0 1rem"
	},
	media: {
		position: 'relative',
		height: '100%',
		width: '100%',
		marginTop: '1rem'
	},
	player: {
		display: 'none'
	}
}));

const api = window.location.protocol+'//'+window.location.hostname+':42069/api';

function GoMatch(props) {
	const classes = useStyles();
	const [matchIndex, setMatchIndex] = useState(0);
	const [open, setOpen] = useState(false);
	//const [changed, setChanged] = useState(false);
	const [songs, setSongs] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentSong, setCurrentSong] = useState(songs ? songs[currentIndex] : null);
	const [autoPlay, setAutoPlay] = useState(false);
	//const [title, setTitle] = useState("");
	//const [description, setDescription] = useState("");
	const [matches, setMatches] = useState([]);	
  
	const handleOpen = () => {
		setOpen(true);
	};
  
	const handleClose = () => {
		setOpen(false);
	};
	
	useEffect(() => {
		if(currentIndex >= 0 && currentIndex < songs.length){
			setCurrentSong(songs[currentIndex]);
		}
	}, [currentIndex, songs, autoPlay]);
	
	
	useEffect(() => {
		if(matches.length > 0) {
			if(matchIndex < 0) {
				setMatchIndex(matches.length - 1);
			} else if(matchIndex >= matches.length) {
				setMatchIndex(0);
			} else {
				setSongs(matches[matchIndex]['songList']);
				setCurrentIndex(0);
			}
		}
	}, [matchIndex, matches]);
	
	useEffect(() => {
		if(open){
			fetchMatches();
		}
	}, [open]);

	const fetchMatches = async() => {
		let userToken = localStorage.getItem('userToken');
		if(userToken) {
			let requestOptions = {
				method: 'GET',
				headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
			};
			let response = await fetch(api + `/match/matches/uid/${props.user._id}`, requestOptions);
			if(response.status === 200) {
				let data = await response.json();
				setMatches(data);
			} else {
				setMatches([]);
			}
		}
	};

	const handleCurrentIndex = (value) => {
		if (value >= songs.length) {
			setCurrentIndex(0);
		}
		else if (value < 0) {
			setCurrentIndex(songs.length - 1);
		}
		else {
			setCurrentIndex(value);
		}
	}

	const handleNext = () => {
		setMatchIndex(matchIndex + 1);
	};
	
	const handlePrev = () => {
		setMatchIndex(matchIndex - 1);
	};
	
	const handleLike = async() => {
		let indexToDelete = matchIndex;
		let userToken = localStorage.getItem('userToken');
		if(props.user && matches[matchIndex] && userToken) {
			setMatches(matches.filter(function(match, index) { 
				return index !== indexToDelete;
			}));
			let matchedID = matches[matchIndex]._id;
			let likeData = {
				user: props.user._id,
				receiver: matchedID
			};
			let requestOptions = {
				method: 'POST',
				headers: {'Content-Type': 'application/json', 'x-access-token': userToken},
				body: JSON.stringify(likeData)
			};
			let response = await fetch(`${api}/match/like`, requestOptions);
			if (response.status === 200) {
			}
		}
	};
	
	const handleDislike = async() => {
		let indexToDelete = matchIndex;
		let userToken = localStorage.getItem('userToken');
		if(props.user && matches[matchIndex] && userToken) {
			setMatches(matches.filter(function(match, index) { 
				return index !== indexToDelete;
			}));
			let matchedID = matches[matchIndex]._id;
			let likeData = {
				user: props.user._id,
				receiver: matchedID
			};
			let requestOptions = {
				method: 'POST',
				headers: {'Content-Type': 'application/json', 'x-access-token': userToken},
				body: JSON.stringify(likeData)
			};
			let response = await fetch(`${api}/match/dislike`, requestOptions);
			if (response.status === 200) {
			} 
		}
	};
	
	const handleNextSong = () => {
		setAutoPlay(true);
		handleCurrentIndex(currentIndex + 1);
	};

	return (
		<div className={classes.container}>
			<Button className={classes.button} onClick={handleOpen}  variant="contained" fullWidth color="secondary">{"Go Match"}</Button>
			<Dialog 
				fullWidth={true}
				maxWidth="xl" className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item xs={12} sm={6}>
						<DialogTitle disableTypography id="form-dialog-title" className={classes.modalTitle}>Go Match</DialogTitle>
					</Grid>

					<Grid item xs={12} sm={1} className={classes.importGrid}>
						<DialogActions>
							<Button variant="contained" onClick={handleClose} color="secondary" className={classes.cancel}>
								Exit
							</Button>
						</DialogActions>
					</Grid> 
				</Grid>
				{ matches.length > 0 && matches[matchIndex] ? 
				<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="flex-start"
				className={classes.content}
				>
					<Grid container 
						direction="column" item xs={4}
						className={classes.leftCard}>
						<Grid item>
							<Typography variant="h3">{matches[matchIndex]['playlistName']}</Typography> 
						</Grid>
						
						<Grid item className={classes.description}>
						<Typography variant="h6">{matches[matchIndex]['playlistDescription']}</Typography>
						</Grid>
						<Grid item>
							<Avatar variant="rounded" className={classes.profileImg} src={matches[matchIndex]['imgSrc'] ? matches[matchIndex]['imgSrc'] : placeholder}></Avatar>
						</Grid>
						<Grid item>
							<Typography variant="h3" className={classes.profileName}>{matches[matchIndex]['name']}</Typography>
						</Grid>
					</Grid>
					<Grid container 
						direction="column" item xs={8}
						className={classes.rightCard}>
						<Grid item container className={classes.playlist}>
							<Playlist title="" importable={false} editable={false} draggable={false} notSharable={true}
								songs={songs} setSongs={setSongs} currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex}
								setAutoPlay={setAutoPlay} playlistID={""}/>
						</Grid>
						<Grid item container>
							<Media>
								{mediaProps => (
								<div className={classes.media} onKeyDown={keyboardControls.bind(null, mediaProps)}>
									<Player src={currentSong ? currentSong.url : null} autoPlay={autoPlay} className={classes.player} 
										defaultVolume={0.25} onEnded={handleNextSong} />
									<PlayerControls currentIndex={currentIndex} 
										name={currentSong ? `${currentSong['title']} - ${currentSong['author']}` : null} 
										handleCurrentIndex={handleCurrentIndex} imgUrl={currentSong ? currentSong.imgUrl : placeholder} 
										autoPlay={autoPlay} setAutoPlay={setAutoPlay}  />
								</div>
								)}
							</Media>
						</Grid>
						<Grid container direction="row" justify="space-evenly" alignItems="center">
							<Button variant="contained" onClick={handlePrev}
							className={classes.likeButton}><NavigateBeforeIcon color="primary" className={classes.likeImg}></NavigateBeforeIcon></Button>
							<Button variant="contained" onClick={handleLike}
							className={classes.likeButton}><Avatar className={classes.likeImg} src={heart} variant="rounded"></Avatar></Button> 
							<Button variant="contained" onClick={handleDislike}
							className={classes.likeButton}><Avatar className={classes.likeImg} src={heartBreak} variant="rounded"></Avatar></Button>
							<Button variant="contained" onClick={handleNext}
							className={classes.likeButton}><NavigateNextIcon color="primary" className={classes.likeImg}></NavigateNextIcon></Button>

						</Grid>
					</Grid>
				</Grid> 
				: 
				<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				className={classes.content}>
					<Typography variant="h6">{"There are no matches available at this time. Please check in later."}</Typography>
				</Grid>	}
			</Dialog>
		</div>
	);
}

export default GoMatch;