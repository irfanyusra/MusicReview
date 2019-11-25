const express = require('express');
const router = express.Router();

//The controller functions for item routes
const review_controller = require('../controllers/review.controller');

router.post('/create', review_controller.create_review); //Creates reviews

router.get('/items', review_controller.get_all_reviews); //Gets all the reviewss

router.get('/:id', review_controller.get_review); //Gets using id

// router.get('/name/:name', reviews_controller.get_review_name); //Gets using name 

router.put('/update/:id', review_controller.update_review); //updates using id

router.delete('/delete/:id', review_controller.delete_review); //deletes using id 

module.exports = router;