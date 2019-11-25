const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

router.put('/song', song_controller.create_song); //Creates songs
router.post('/song/:id', song_controller.update_song); //updates using id
router.put('/add-review/:id', review_controller.create_review); //Create a new review for the song with the given ID

//get all reviews by the user? like if i dont make rating required

module.exports = router;