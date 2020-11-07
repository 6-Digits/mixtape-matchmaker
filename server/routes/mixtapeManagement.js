const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const accounts = require('../models/account');
const mixtapes = require('../models/mixtape');
const songs = require('../models/song');
const comments = require('../models/comment');
const verifyToken = require('../authentication/verifyToken');
const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: true }));

// Gets a single mixtape from the database based on their unique mixtape id
router.get('/id/:id', async (req, res) => {
	await mixtapes.findById(req.params.id, function (err, user) {
		if (err) {
			return res.status(500).send("There was a problem adding the information to the database.");
		}else if(!user){
			return res.status(404).send("No user found.");
		}else{
			return res.status(200).send(user);
		}
	});
});

// Gets a list of mixtapes from the database based on their owner
router.get('/uid/:id', async (req, res) => {
	await mixtapes.find({ owner :req.params.id }, function (err, user) {
		if (err) {
			return res.status(500).send("There was a problem adding the information to the database.");
		}else if(!user){
			return res.status(404).send("No user found.");
		}else{
			return res.status(200).send(user);
		}
	});
});

// Gets a list of mixtapes from the database based their view count
router.get('/popular', async (req, res) => {
	await mixtapes.find().sort({ views: -1}).limit(20).then((result) => {
		if(!result){
			return res.status(404).send("No mixtapes found.");
		}
		return res.status(200).send(result);	
	}).catch((error) => {
		console.log(error);
		return res.send(500).send("There is a problem with accessing the database");
	});
});

// Gets a list of mixtapes from the database based their view count
router.get('/likes', async (req, res) => {
	await mixtapes.find().sort({ hearts: -1}).limit(20).then((result) => {
		if(!result){
			return res.status(404).send("No mixtapes found.");
		}
		return res.status(200).send(result);
	}).catch((error) => {
		console.log(error);
		return res.send(500).send("There is a problem with accessing the database");
	});
});

// Gets songs in that mixtape
router.get('/viewMixtape/id/:id', async (req, res) => {
	await mixtapes.findById(req.params.id).then(async (result) => {
		if(!result){
			return res.status(404).send("No mixtapes found.");
		}
		await songs.find({ _id : {$in: result.songList}}).then((result) => {
			return res.status(200).send(result);
		}).catch((error) => {
			console.log(error);
			return res.status(500).send("There is a problem with finding the song.")
		})
	}).catch((error) => {
		console.log(error);
		return res.status(500).send("There is a problem with finding the mixtape.");
	});
});

// Creates a mixtape in the database
router.post('/createMixtape/id/:id', verifyToken, async (req, res) => {
	await mixtapes.create({
		owner: req.params.id,
    }).then(async (result) => {
		if(!result){
			return res.status(404).send("There is a problem with creating the mixtape.");
		}
		return res.status(200).send(result);
	}).catch((error) => {
		console.log(error);
		return res.status(500).send("There is a problem with the database.");
	});
});

// Deletes a mixtape in the database
router.post('/deleteMixtape/id/:id', verifyToken, async (req, res) => {
	await mixtapes.remove({ owner: req.params.id }).then(async (result) => {
		if(!result){
			return res.status(404).send("There is a problem with removing the mixtape.");
		}
		return res.status(200).send(result);
	}).catch((error) => {
		console.log(error);
		return res.status(500).send("There is a problem with the database.");
	});
});

// Creates a comment for a specified mixtape in the database
// Updates the mixtapeJSON.comments
router.post('/createComment', verifyToken, async (req, res) => {
	await comments.create({
		owner: req.body.id,
		mixtape: req.body.mixtape,
		text: req.body.text
    }).then(async (result) => {
		if(!result){
			return res.status(404).send("There is a problem with creating the comment.");
		}
		return res.status(200).send(result);
	}).catch((error) => {
		console.log(error);
		return res.status(500).send("There is a problem with the database.");
	});
});

module.exports = router;