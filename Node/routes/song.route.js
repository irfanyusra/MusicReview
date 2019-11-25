const express = require('express');
const router = express.Router();

//The controller functions for item routes
const song_controller = require('../controllers/song.controller');

router.post('/create', song_controller.create_song); //Creates songs

router.get('/items', song_controller.get_all_songs); //Gets all the songss

router.get('/:id', song_controller.get_song); //Gets using id

router.get('/title/:title', song_controller.get_song_title); //Gets using name 

router.put('/update/:id', song_controller.update_song); //updates using id

router.delete('/delete/:id', song_controller.delete_song); //deletes using id 

module.exports = router;