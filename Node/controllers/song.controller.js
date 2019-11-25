const Song = require('../models/song.model');
// const Song = require('../models/review.model');


exports.get_10_songs = function (req, res) {
  console.log("getting top ten songs");
};

exports.get_match_songs = function (req, res) {
  console.log("getting matched songs");
};

exports.incrementNoOfReviews = function (songId){
  console.log(songId);
  Song.findById(songId, function (err, song) {
    if (err) console.log(err);
    else {
      song.noOfRatings = song.noOfRatings+1;  
      song.save(function (err) {
        if (err) console.log(err);
        else return;
      });
    }
  });
}


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
      noOfRatings:req.body.noOfRatings,
      avgOfRating: req.body.avgOfRating,
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