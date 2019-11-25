const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');
const user_controller = require('../controllers/user.controller');
const review_controller = require('../controllers/review.controller');

router.put('/song', song_controller.create_song); //Creates songs
router.post('/song/:id', song_controller.update_song); //updates using id
router.put('/add-review/:id', review_controller.create_review); //Create a new review for the song with the given ID


// add - review /: id - 
// router.get('/songs/items', song_controller.get_all_songs); //Gets all the songs
// router.get('/:id', song_controller.get_song); //Gets using id
// router.get('/title/:title', song_controller.get_song_title); //Gets using name 
// router.delete('songs/delete/:id', song_controller.delete_song); //deletes using id 

module.exports = router;