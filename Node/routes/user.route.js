const express = require('express');
const router = express.Router();

//The controller functions for item routes
const users_controller = require('../controllers/user.controller');

router.post('/create', users_controller.create_user); //Creates users

router.get('/items', users_controller.get_all_users); //Gets all the users

router.get('/:id', users_controller.get_user); //Gets using id

router.get('/email/:email', users_controller.get_user_email); //Gets using name 

router.put('/update/:id', users_controller.update_user); //updates using id

router.delete('/delete/:id', users_controller.delete_user); //deletes using id 

module.exports = router;