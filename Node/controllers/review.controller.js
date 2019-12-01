const Review = require('../models/review.model');
const song_controller = require('../controllers/song.controller');

exports.test = function (req, res) {
  return res.send('the review controller Works!');
};

//to create a review
exports.create_review = function (req, res) {
  let songId = req.params.songId;
  let review = new Review(
    {
      subject: req.body.subject,
      comment: req.body.comment,
      songId: req.params.id,
      submittedBy: req.body.submittedBy,
      rating: req.body.rating,
      submittedOn: Date.now(),
    }
  );

  review.save(function (err) {
    if (err) return res.send("err: cannot increment the number of reviews in reviews controller");
    else {
      song_controller.increment_no_of_reviews(songId);
      //update avg rating
      Review.find({ songId: songId }, function (err, reviews) {
        if (err) return res.send(err);
        console.log(song_controller.new_avg_rating(reviews, songId));
      });
      return res.send(review.id);
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


// //getting a review using name
// exports.get_review_name = function (req, res) {
//   Review.find({"name":req.params.name}, (err, review) => {
//     if (err) return res.send('Error in finding the review');
//     res.send(review);
//   })
// };

//updates review
// exports.update_review = function (req, res) {
//   Review.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, review) {
//     if (err) return res.send(err);
//     res.send(review + ' udpated.');
//   });
// };

//deletes review 
// exports.delete_review = function (req, res) {
//   Review.findByIdAndRemove(req.params.id, function (err) {
//     if (err) return res.send(err);
//     res.send('Deleted successfully!');
//   })
// };


//most recent review of a song 
exports.get_most_recent_review = function (req, res) {
  Review.find({ songId: req.params.songId }).sort({ submittedOn: 'desc' }).limit(1)
    .exec(function (err, review) {
      if (err) return res.send(err);
      return res.send(review);
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
      if (err) return res.send(err);
      return res.send(reviews);
    });
};
