const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

//song controller
router.put('/song/add', song_controller.create_song); //Creates songs
router.post('/song/update/:id', song_controller.update_song); //updates using id


//review controller 
router.put('/review/add/:songId', review_controller.create_review); //Create a new review for the song with the given ID
router.get('/review/get-all', review_controller.get_all_reviews);


// router.get('/review/get-song/:id', review_controller.get_song_using_review);
//get all reviews by the user? like if i dont make rating required


module.exports = router;