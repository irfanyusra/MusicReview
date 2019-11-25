const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');

router.post('/copyright/:id', song_controller.update_song_copyright); //Set or update copyright violation attributes for a given song ID
router.get('/copyright', song_controller.get_all_songs_copyrightViolated); //Return all songs which are marked as copyright violations.
router.post('/toggle-active/:id', user_controller.toggle_active); // Set or clear “account deactivated” flag for a given user.
router.post('/toggle-hide/:id', song_controller.toggle_hide); 
router.post('/toggle-admin/:id', user_controller.toggle_admin); //toggle admin for a user 
router.get('/users', user_controller.get_all_users); //Return all songs which are marked as copyright violations.

module.exports = router;