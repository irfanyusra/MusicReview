const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');

router.post('/copyright/:id', song_controller.update_song_copyright); //Set or update copyright violation attributes for a given song ID
router.get('/copyright', song_controller.get_all_songs_copyrightViolated); //Return all songs which are marked as copyright violations.
// router.post('/ToggleActive/:id', user_controller.toggle_activate); // Set or clear “account deactivated” flag for a given user.
// router.post('/toggleHide/:id', song_controller.toggle_hide); 

module.exports = router;