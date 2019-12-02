const express = require('express');
const router = express.Router();


//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

router.get('/song/test', song_controller.test);
router.get('/review/test', review_controller.test);
router.get('/user/test', user_controller.test);

router.post('/song/copyright/:id', song_controller.toggle_song_copyright); //Set or update copyright violation attributes for a given song ID
router.get('/song/copyright', song_controller.get_all_songs_copyrightViolated); //Return all songs which are marked as copyright violations.
router.post('/song/toggle-hide/:id', song_controller.toggle_hide);
router.post('/user/toggle-active/:id', user_controller.toggle_active); // Set or clear “account deactivated” flag for a given user.
router.post('/user/toggle-admin/:id', user_controller.toggle_admin); //toggle admin for a user 
router.get('/user/all', user_controller.get_all_users); //Return all users




router.get('/user/compare-token', user_controller.compare_token);


module.exports = router;
