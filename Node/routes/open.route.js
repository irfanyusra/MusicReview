const express = require('express');
const router = express.Router();

const passport = require('passport')
const passportConfig = require('../passport')

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

const security_privacy_controller = require('../controllers/sec-priv.controller');
const dmca_takedown_controller = require('../controllers/dmca_takedown.controller'); 

// router.post('/song/add', song_controller.create_song);
router.get('/song/search', song_controller.get_match_songs);
router.get('/songs/top-10', song_controller.get_10_songs); //Gets 10 songs
router.get('/songs/all', song_controller.get_all_songs); //Gets 10 songs
router.get('/songs/all-avail', song_controller.get_all_avail_songs); //Gets 10 songs

//review controller 
router.get('/review/get/:id', review_controller.get_review);
router.get('/reviews/get-using-song/:id', review_controller.get_reviews_of_song); //return all reviews for a given song ID
router.get('/review/get-reviews/:songId', review_controller.get_reviews_of_song);
router.get('/review/most-recent/:songId', review_controller.get_most_recent_review);
router.get('/review/get-ordered/:songId', review_controller.get_desc_ord_reviews);

//login validations routes... idk from here or someother 


//user controller 
// router.get('/user/error', user_controller.loginError);

router.get('/user/verify/:email', user_controller.verify_user);
router.post('/user/login', passport.authenticate('local', { session: false, failureRedirect: "/api/open/login/error" }), user_controller.login);
router.get('/login/error', user_controller.login_error);

// router.get('/user/auth-local', passport.authenticate('local', { session: false, successRedirect: "/admin/user/test", failureRedirect: "/" }), user_controller.passportTest)
// router.get('/user/auth-jwt', passport.authenticate('jwt', { session: false }), user_controller.passportJwtTest)
router.get('/user/secure-local', user_controller.passport_test)
router.get('/user/secure-jwt', user_controller.passport_jwt_test)

//TODO: put or post
router.post('/user/add', user_controller.create_user);
router.get('/error', function (req, res) {
    console.log("login again");
    return res.send({ msg: "Invalid token! Login again" })
});

router.post('/dmca-takedown/create', dmca_takedown_controller.create_dmca_takedown);
router.post('/dmca-takedown/update/:id', dmca_takedown_controller.update_dmca_takedown);

// router.get('/security-privacy', security_privacy_controller.get_security_privacy);
router.post('/security-privacy/create', security_privacy_controller.create_security_privacy);
router.post('/security-privacy/update/:id', security_privacy_controller.update_security_privacy);

module.exports = router;