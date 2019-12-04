//TODO: put or post
const express = require('express');
const router = express.Router();

const passport = require('passport')

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

const security_privacy_controller = require('../controllers/sec_priv.controller');
const dmca_takedown_controller = require('../controllers/dmca_takedown.controller'); 

//song controller
router.get('/song/search', song_controller.get_match_songs);
router.get('/songs/top-10', song_controller.get_10_songs); //Gets 10 songs
router.get('/songs/all', song_controller.get_all_songs); //Gets 10 songs
router.get('/songs/all-avail', song_controller.get_all_avail_songs); //Gets 10 songs
router.get('/song/search/:keyword', song_controller.get_match_songs)

//review controller 
router.get('/review/get/:id', review_controller.get_review);
router.get('/reviews/get-using-song/:id', review_controller.get_reviews_of_song); //return all reviews for a given song ID
router.get('/review/get-reviews/:songId', review_controller.get_reviews_of_song);
router.get('/review/most-recent/:songId', review_controller.get_most_recent_review);
router.get('/review/get-ordered/:songId', review_controller.get_desc_ord_reviews);

//user controller 
router.get('/user/verify/:email', user_controller.verify_user);
router.post('/user/login', passport.authenticate('local', { session: false }), user_controller.login);
router.get('/login/error', user_controller.login_error);
router.post('/user/add', user_controller.create_user);

// router.get('/user/secure-local', passport.authenticate('local', { session: false, failureRedirect: "/" }), user_controller.passport_test) //successRedirect: "/admin/user/test", 
// router.get('/user/secure-jwt', user_controller.passport_jwt_test)

router.get('/security-privacy', security_privacy_controller.get_security_privacy);
router.get('/dmca-takedown', dmca_takedown_controller.get_dmca_takedown);

router.get('/confirmation/:token', user_controller.confirmation_post);
    router.post('/resend/:email', user_controller.resend_token_post);
    // router.post('/login', user_controller.loginPost);
// router.post('/signup', user_controller.signup_post);


module.exports = router;