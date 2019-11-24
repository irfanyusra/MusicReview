const express = require('express');
const router = express.Router();

//The controller functions for item routes
const songs_controller = require('../controllers/song.controller');

router.post('/create', songs_controller.create_song); //Creates songs

router.get('/items', songs_controller.get_all_songs); //Gets all the songss

router.get('/:id', songs_controller.get_song); //Gets using id

router.get('/name/:name', songs_controller.get_song_name); //Gets using name 

router.put('/update/:id', songs_controller.update_song); //updates using id

router.delete('/delete/:id', songs_controller.delete_song); //deletes using id 

module.exports = router;