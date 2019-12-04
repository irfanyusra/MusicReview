const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

//song controller
router.post('/song/add', song_controller.create_song); //Creates songs
router.put('/song/update/:id', song_controller.update_song); //updates using id


//review controller 
router.post('/review', review_controller.create_review); //Create a new review for the song with the given ID
router.get('/review', review_controller.get_all_reviews);

module.exports = router;