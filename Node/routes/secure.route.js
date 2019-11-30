const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

//song controller
router.get('/song/test', song_controller.test);
router.put('/song/add', song_controller.create_song); //Creates songs
router.post('/song/update/:id', song_controller.update_song); //updates using id
router.post('/song/toggle-hide/:id', song_controller.toggle_hide); //updates using id


//review controller 
// router.get('/review/test', review_controller.test);
router.put('/review/add/:songId', review_controller.create_review); //Create a new review for the song with the given ID
router.get('/review/get/:id', review_controller.get_review);
router.get('/review/get-all', review_controller.get_all_reviews)
router.get('/review/get-reviews/:songId', review_controller.get_reviews_of_song)
router.get('/review/most-recent/:songId', review_controller.get_most_recent_review)


// router.get('/review/get-song/:id', review_controller.get_song_using_review);
//get all reviews by the user? like if i dont make rating required

//user controller 
// router.get('/user/test', userController.test);

module.exports = router;