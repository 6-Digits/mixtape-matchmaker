import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Dialog, DialogActions, Button, DialogTitle, Typography, Grid, Container, TextField, Box, Link} from '@material-ui/core';
import ReactPlayer from 'react-player/youtube';
import Playlist from "../modules/Playlist";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
	container: {
        width:"100%",
        height:"100%"
    },
    modal: {
    },
    modalTitle: {
        fontSize: "3rem",
        fontWeight: "bold"
    },
    playlistArea: {
        padding: "1rem 0rem 1rem 0rem",
        borderRadius: '0.5rem',
        backgroundColor: theme.palette.background.default,
        width: "97%",
        margin: "auto"

    },
    player: {
        marginTop: '1rem',
        marginBottom: '1rem'
    },
    playlistTitle: {
        textAlign: "center"
    },
    descriptionBox: {
        padding: "1rem 0rem 1rem 0rem",
        width: "97%",
        margin: "auto"
    }, 
    commentSection: {
        padding: "1rem 0rem 1rem 0rem",
        width: "97%",
        margin: "auto",
        borderRadius: '0.75rem',
        backgroundColor: theme.palette.background.default,
    },
    icon: {
        height: '3vh',
        width: '3vh'
    },
    playlistDescription: {
        overflowY: "auto",
        height: '10vh'
    },
    playlistAuthor: {
        overflowX: "auto"
    },
    profileImg: {
        width: "100%",
        height: "10vh"
    },
    makeCommentSection: {
        marginTop:"0.75rem",
        marginLeft:"-3.5rem"
    },
    enterComment: {
        width:"102.5%",
        height:"100%",
    },
    sendMessageButton: {
        height:"100%",
        width:"100%",
        marginLeft:'3.25rem'
    },
    sendMsgIcon: {
        height:"50%",
        width:"50%"
    },
    comment:{
        marginTop: '1rem',
        padding: "1rem 1rem 1rem 1rem",
        borderRadius: '0.5rem',
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.background.default
    },
    commentBox: {
        width:'95%',
        height: '15vh',
        overflowY: 'auto',
        
    },
    messageText: {
        fontSize: '1.5rem'
    },
    messageTS: {
        fontSize: '0.5rem'
    }
}));

const importedComments = [
    {
        message: "Hello there",
        user: "Kenobi",
        timestamp: "2005-05-20T00:00:00.000Z"
    },
    {
        message: "General Kenobi",
        user: "Grievous",
        timestamp: "2005-05-20T00:00:00.000Z"
    },
    {
        message: "Hello there",
        user: "Kenobi",
        timestamp: "2005-05-20T00:00:00.000Z"
    },
    {
        message: "General Kenobi",
        user: "Grievous",
        timestamp: "2005-05-20T00:00:00.000Z"
    },
    {
        message: "Hello there",
        user: "Kenobi",
        timestamp: "2005-05-20T00:00:00.000Z"
    },
    {
        message: "General Kenobi",
        user: "Grievous",
        timestamp: "2005-05-20T00:00:00.000Z"
    },
    {
        message: "Hello there",
        user: "Kenobi",
        timestamp: "2005-05-20T00:00:00.000Z"
    },
    {
        message: "General Kenobi",
        user: "Grievous",
        timestamp: "2005-05-20T00:00:00.000Z"
    }
];
function ViewPlaylist({viewCount, likeCount, playlistName, playlistAuthor}) {
	const [open, setOpen] = React.useState(false);
	const [comments, setComments] = React.useState(importedComments);
    viewCount = viewCount ? viewCount : 2020;
    playlistName = playlistName ? playlistName : "Ayyy Lmao";
    playlistAuthor = playlistAuthor ? playlistAuthor : "X Æ A-13";
    likeCount = likeCount ? likeCount : 2020;
	const handleOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};
  const classes = useStyles();
	
	return (
		<div className={classes.container}>
			<Button className={classes.button} onClick={handleOpen}  variant="contained" fullWidth>{"ViewPlaylist"}</Button>
            <Dialog 
                fullWidth={true}
                maxWidth="xl" className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle disableTypography  id="form-dialog-title" className={classes.modalTitle}>View Playlist</DialogTitle>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.playlistArea}
                    >
                    <Grid container item xs={12} sm={5}>
                        <ReactPlayer className={classes.player}url='https://www.youtube.com/watch?v=rEq1Z0bjdwc' />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                        <Playlist></Playlist>
                    </Grid>
                </Grid>
                <Grid container 
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={1}
                    className={classes.descriptionBox}>
                    <Grid item xs={1} 
                        container
                        direction="column"
                        alignItems="center">
                        <Grid container item xs={12} direction="row" alignItems="center">
                            <Grid item xs={6}><Button><FavoriteBorderIcon className={classes.icon}/></Button></Grid>
                            <Grid item xs={6}><Typography>{likeCount}</Typography></Grid>
                        </Grid>
                        <Grid container item xs={12} direction="row" alignItems="center">
                            <Grid item xs={6}><Button disabled><VisibilityIcon className={classes.icon}/></Button> </Grid>
                            <Grid item xs={6}><Typography>{viewCount}</Typography></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <Avatar variant="rounded" className={classes.profileImg} src={"https://i.kym-cdn.com/entries/icons/original/000/029/079/hellothere.jpg"}></Avatar>
                    </Grid>
                    <Grid item xs={2}  
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        className={classes.playlistAuthor}>
                        <Grid item xs={12}> <Typography variant="h4">{playlistName}</Typography> </Grid>
                        <Grid item xs={12}> <Typography variant="h6">{`By ${playlistAuthor}`}</Typography> </Grid>
                    </Grid>
                    <Grid item xs={8} className={classes.playlistDescription}>
                        <Typography variant="h6">I hope my classicist friends will forgive me if I abbreviate ‘mimeme’ to ‘meme.’" (The suitable Greek root was mim-, meaning "mime" or "mimic." The English suffix -eme indicates a distinctive unit of language structure, as in "grapheme," "lexeme," and "phoneme.") "Meme" itself, like any good meme, caught on fairly quickly, spreading from person to person as it established itself in the language.</Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    direction="column"
                    className={classes.commentSection}
                    fullWidth>
                    <Box
                        className={classes.commentBox}>
                        {
                            comments.map(({message, user, timestamp},index) => {
                                return( 
                                <Grid
                                    container 
                                    xs={12}
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    spacing={0}
                                    className={classes.comment}>
                                    <Grid item xs={12}>
                                        <Typography disableTypography className={classes.messageText}>
                                        <Link>{user}</Link>{`: ${message}`}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography disableTypography className={classes.messageTS}>{timestamp}</Typography>
                                    </Grid>
                                </Grid>
                                );
                            })
                        }
                    </Box>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.makeCommentSection}
                        xs={11}
                        >
                        <Grid item xs={11} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="send-message"
                                label="Enter a message"
                                type="text"
                                multiline={true}
                                rows={2}
                                id="send-message"
                                className={classes.enterComment}
                                />
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="contained" className={classes.sendMessageButton}>
                                <SendIcon className={classes.sendMsgIcon}/>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <DialogActions>
                <Button variant="contained" onClick={handleClose} color="secondary" className={classes.cancel}>
                    Exit
                </Button>
                </DialogActions>
			</Dialog>
		</div>
	);
}

export default ViewPlaylist;