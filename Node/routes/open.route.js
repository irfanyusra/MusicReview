const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

router.get('/songs', song_controller.get_10_songs); //Gets 10 songs
router.get('/reviews/:id', review_controller.get_reviews_of_song); //return all reviews for a given song ID

router.get('/search', song_controller.get_match_songs); 

//login validations routes... idk from here or someother 


module.exports = router;