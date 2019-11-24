const express = require('express');
const router = express.Router();

//The controller functions for item routes
const reviews_controller = require('../controllers/review.controller');

router.post('/create', reviews_controller.create_review); //Creates reviews

router.get('/items', reviews_controller.get_all_reviews); //Gets all the reviewss

router.get('/:id', reviews_controller.get_review); //Gets using id

// router.get('/name/:name', reviews_controller.get_review_name); //Gets using name 

router.put('/update/:id', reviews_controller.update_review); //updates using id

router.delete('/delete/:id', reviews_controller.delete_review); //deletes using id 

module.exports = router;