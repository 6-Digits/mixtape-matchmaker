import React, { useState, useEffect } from 'react'
import { withMediaProps, utils } from 'react-media-player'
import { Grid, IconButton, Slider, makeStyles, Avatar } from '@material-ui/core';
import { PauseCircleFilled, PlayCircleFilled, SkipPrevious, SkipNext, VolumeUp, VolumeDown, VolumeOff, Fullscreen, FullscreenExit } from '@material-ui/icons';
const { formatTime } = utils;
const useStyles = makeStyles((theme)=>({
	videoSlider: {
		marginLeft: "-1rem"
	},
	volumeSlider: {
		marginLeft: "-1rem"
	},
	imgSrc: {
		height: "4rem",
		width: "7rem"
	}
}));

function PlayerControls({media, currentIndex, handleCurrentIndex, imgUrl, setAutoPlay}) {
	const classes = useStyles();
	const { volume, duration, currentTime } = media;
	
	const handlePlayPause = () => {
		media.playPause();
	}
	
	const handleMuteUnmute = () => {
		media.muteUnmute();
	}
	
	const handleVolume = (event, value) => {
		media.setVolume(value.toFixed(4));
	}
	
	const handleSeek = (event, value) => {
		media.seekTo(value.toFixed(4));
	}
	
	const handleFullscreen = () => {
		media.fullscreen();
	}
	
	const handleNext = () => {
		handleCurrentIndex(currentIndex + 1);
		setAutoPlay(true);
	}
	
	const handlePrevious = () => {
		handleCurrentIndex(currentIndex - 1);
		setAutoPlay(true);
	}
	
	return (
		<Grid container direction="row" alignItems="center" justify="space-between">
				{/* <Grid item>
					<IconButton onClick={handleFullscreen}>
						{media.isFullscreen ? <Fullscreen /> : <FullscreenExit />}
					</IconButton>
				</Grid> */}
				<Grid item xs={1}>
					<Avatar variant="square" className={classes.imgSrc} src={imgUrl}></Avatar>
				</Grid>
				<Grid item xs={1} container>
					<IconButton onClick={handlePrevious}>
						<SkipPrevious fontSize="large" />
					</IconButton>
				</Grid>
				
				<Grid item xs={1} container>
					<IconButton onClick={handlePlayPause}>
						{media.isPlaying ? <PauseCircleFilled fontSize="large" /> : <PlayCircleFilled fontSize="large" />}
					</IconButton>
				</Grid>
				
				<Grid item xs={1} container>
					<IconButton onClick={handleNext}>
						<SkipNext fontSize="large" />
					</IconButton>
				</Grid>
				<Grid item xs={1} container>
					<time>
						{formatTime(media.currentTime)}
					</time>
				</Grid>
				
				<Grid item xs={3} container>
					<Slider value={currentTime} min={0} max={duration ? duration.toFixed(4) : 0} step={1} onChange={handleSeek} className={classes.videoSlider}/>
				</Grid>
				
				<Grid item xs={1} container>
					<time>
						{formatTime(media.duration)}
					</time>
				</Grid>
				
				<Grid item xs={1} container>
					<IconButton onClick={handleMuteUnmute}>
						{media.isMuted ? <VolumeOff /> : volume > 0.5 ? <VolumeUp /> : <VolumeDown />}
					</IconButton>
				</Grid>
				
				<Grid item xs={1} container>
					<Slider value={volume} min={0} max={1} step={0.05} onChange={handleVolume} className={classes.volumeSlider}/>
				</Grid>
		</Grid>
	)
}

export default withMediaProps(PlayerControls);