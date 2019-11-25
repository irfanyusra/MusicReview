const Song = require('../models/song.model');
// const Song = require('../models/review.model');


exports.get_10_songs = function (req, res) {
  console.log("getting top ten songs");
  //find all songs and sort by avg rating, limit of 10
  Song.find({})
    .sort({ avgOfRatings: 'desc' }).limit(10)
    .exec(function(err, songs) {
      if(err) res.send(err); 
      return res.send(songs);  
    });

};

exports.get_match_songs = function (req, res) {
  console.log("getting matched songs");
};

exports.newAvgRating = function (reviews,songId) {
      let sum = 0;
      for (let i = 0; i < reviews.length; i++) {
        sum += reviews[i].rating;
      }
      let avg = sum / reviews.length;
      Song.findById(songId, function (err, song) {
        if (err) console.log(err);
        else {
          song.avgOfRatings = avg;
          song.save(function (err) {
            if (err) console.log(err);
            else return;
          });
        }
      });
};

exports.incrementNoOfReviews = function (songId){
  console.log(songId);
  Song.findById(songId, function (err, song) {
    if (err) console.log(err);
    else {
      song.noOfReviews = song.noOfReviews+1;  
      song.save(function (err) {
        if (err) console.log(err);
        else return;
      });
    }
  });
}

exports.mostRecentReviewOfASong = function (req, res) {
  Review.findById(req.params.id, { sort: { 'created_at': 1 } }, function (err, review) {
    if (err) return res.send(err);
    else return res.send(review);
    
  });
};

exports.toggle_hide = function (req, res) {
  Song.findById(req.params.id, function (err, song) {
  if (err) return res.send(err);
  else {
    song.hidden=!song.hidden;
    song.save(function (err) {
      if (err) return res.send(err);
      return res.send(song.id);
    });
  }
  });
};

//to create a song
exports.create_song = function (req, res) {
  let song = new Song(
    {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      year: req.body.year,
      genre: req.body.genre,
      hidden: req.body.hidden,
      copyRightViolation: req.body.copyRightViolation,
      noOfReviews:req.body.noOfReviews,
      avgOfRatings: req.body.avgOfRatings,
    }
  );

  song.save(function (err) {
    if (err) return res.send(err);
    return res.send(song.id);
  })
};

//updates song
exports.update_song = function (req, res) {
  Song.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, song) {
    if (err) return res.send(err);
    res.send(song.id + ' udpated.')
  });
};

exports.update_song_copyright = function (req, res) {
  Song.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, song) {
    if (err) return res.send(err);
    res.send(song + ' udpated.');
    console.log("updating song");
  });
};

//getting all the songs that are copyrighted true 
exports.get_all_songs_copyrightViolated = function (req, res) {
  Song.find({copyRightViolation: true},function (err, songs) {
   if (err) return res.send(err);
   return res.send(songs);
  })
};

//getting a song using id 
// exports.get_song = function (req, res) {
//   Song.findById(req.params.id, (err, song) => {
//     if (err) return res.send('Error for finding the song');
//     res.send(song);
//   })
// };


//getting a song using name
// exports.get_song_title = function (req, res) {
//   Song.find({"name":req.params.name}, (err, song) => {
//     if (err) return res.send('Error in finding the song');
//     res.send(song);
//   })
// };



//deletes song 
// exports.delete_song = function (req, res) {
//   Song.findByIdAndRemove(req.params.id, function (err) {
//     if (err) return res.send(err);
//     res.send('Deleted successfully!');
//   })
// };