const express = require('express');
const router = express.Router();

//The controller functions for item routes
const user_controller = require('../controllers/user.controller');

router.post('/create', user_controller.create_user); //Creates users

router.get('/items', user_controller.get_all_users); //Gets all the users

router.get('/:id', user_controller.get_user); //Gets using id

router.get('/email/:email', user_controller.get_user_email); //Gets using name 

router.put('/update/:id', user_controller.update_user); //updates using id

router.delete('/delete/:id', user_controller.delete_user); //deletes using id 

module.exports = router;