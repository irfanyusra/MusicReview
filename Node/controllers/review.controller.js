const Review = require('../models/review.model');

//to create a review
exports.create_review = function (req, res) {
  let review = new Review(
    {
      subject: req.body.subject,
      comment: req.body.comment,
      songId: req.body.songId,
      submittedBy: req.body.submittedBy,
      rating: req.body.rating,
      submittedOn: req.body.submittedOn

    }
  );

  review.save(function (err) {
    if (err) return res.send(err);
    res.send('Review Created successfully')
  })
};


//getting all the reviews 
exports.get_all_reviews = function (req, res) {
  Review.find(function (err, review) {
    res.send(review);
  })
};

//getting a review using id 
exports.get_review = function (req, res) {
  Review.findById(req.params.id, (err, review) => {
    if (err) return res.send('Error for finding the review');
    res.send(review);
  })
};


// //getting a review using name
// exports.get_review_name = function (req, res) {
//   Review.find({"name":req.params.name}, (err, review) => {
//     if (err) return res.send('Error in finding the review');
//     res.send(review);
//   })
// };

//updates review
exports.update_review = function (req, res) {
  Review.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, review) {
    if (err) return res.send(err);
    res.send(review + ' udpated.');
  });
};

//deletes review 
exports.delete_review = function (req, res) {
  Review.findByIdAndRemove(req.params.id, function (err) {
    if (err) return res.send(err);
    res.send('Deleted successfully!');
  })
};