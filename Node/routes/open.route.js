const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

router.post('/song/add', song_controller.create_song);
router.get('/song/search', song_controller.get_match_songs); 
router.get('/songs/top-10', song_controller.get_10_songs); //Gets 10 songs

//review controller 
router.get('/review/:id', review_controller.get_review);
router.get('/reviews/get/:id', review_controller.get_reviews_of_song); //return all reviews for a given song ID
//login validations routes... idk from here or someother 


//user controller 
// router.get('/user/test', user_controller.test);
// router.get('/user/error', user_controller.loginError);
// router.post('/user/login', passport.authenticate('local', { session: false, failureRedirect: "/open/user/error" }), user_controller.login)





module.exports = router;