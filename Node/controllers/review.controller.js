const Review = require('../models/review.model');
const song_controller = require('../controllers/song.controller');

exports.test = function (req, res) {
  return res.send('the review controller Works!');
};

//to create a review
exports.create_review = function (req, res) {

  let review = new Review(
    {
      subject: req.body.subject,
      comment: req.body.comment,
      songId: req.body.songId,
      submittedBy: req.body.submittedBy,
      rating: req.body.rating,
      submittedOn: Date.now(),
    }
  );

  console.log("attempting to save this reveiew: " + review);

  review.save(function (err) {
    if (err) return res.send({ error: "err: cannot increment the number of reviews in reviews controller" });
    else {
      song_controller.increment_no_of_reviews(review.songId);
      //update avg rating
      Review.find({ songId: review.songId }, function (err, reviews) {
        if (err) return res.send({ error: err });
        song_controller.new_avg_rating(reviews, review.songId);
        console.log("adding the new avg");
      });
      return res.send({ msg: "review added: " + review.id });
    }
  });
};

exports.get_reviews_of_song = function (req, res) {
  console.log("getting all reviews of this song");
  Review.find({ songId: req.params.songId }, function (err, songs) {
    if (err) return res.send(err);
    return res.send(songs);
  });
};

//getting all the reviews 
exports.get_all_reviews = function (req, res) {
  Review.find(function (err, review) {
    if (err) return res.send(err);
    return res.send(review);
  });
};

//getting a review using id 
exports.get_review = function (req, res) {
  Review.findById(req.params.id, (err, review) => {
    if (err) return res.send('Error for finding the review');
    return res.send(review);
  });
};

//most recent review of a song 
exports.get_most_recent_review = function (req, res) {
  Review.find({ songId: req.params.songId }).sort({ submittedOn: 'desc' }).limit(1)
    .exec(function (err, review) {
      if (err) return res.send({ error: "err" });
      return res.send({ msg: review });
    });
};

exports.get_song_using_review = function (req, res) {
  Review.find({ songId: req.params.songId }).sort({ submittedOn: 'desc' }).limit(1)
    .exec(function (err, review) {
      if (err) return res.send(err);
      return res.send(review);
    });
};


exports.get_desc_ord_reviews = function (req, res) {
  Review.find({ songId: req.params.songId }).sort({ submittedOn: 'desc' })
    .exec(function (err, reviews) {
      if (err) return res.send({ error: err });
      return res.send({ msg: reviews });
    });
};
