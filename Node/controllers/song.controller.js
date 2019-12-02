const Song = require('../models/song.model');

exports.test = function (req, res) {
  return res.send('song controller test');
};

exports.get_10_songs = function (req, res) {
  console.log("getting top ten songs");
  //find all songs and sort by avg rating, limit of 10
  Song.find({ hidden: false })
    .sort({ avgOfRatings: 'desc' }).limit(10)
    .exec(function (err, songs) {
      if (err) return res.send("err: cannot get top 10 songs");
      return res.send(songs);
    });

};

// TODO: get matching songs .. fuse.js 
exports.get_match_songs = function (req, res) {
  console.log("getting matched songs");
};

exports.new_avg_rating = function (reviews, songId) {
  console.log("here");
  let sum = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += reviews[i].rating;
  }
  let avg = sum / reviews.length;
  Song.findById(songId, function (err, song) {
    if (err) console.log("err: cannot find a song");
    else {
      console.log("old avg" + song.avgOfRatings);
      song.avgOfRatings = avg;
      song.save(function (err) {
        if (err) console.log("err: cannot get a new avg rating of a song");
        else return;
      });
      console.log(song.avgOfRatings);
    }
  });
};

exports.increment_no_of_reviews = function (songId) {
  console.log(songId);
  Song.findById(songId, function (err, song) {
    if (err) console.log("err: cannot increment number of reviews in song controller");
    else {
      song.noOfReviews = song.noOfReviews + 1;
      song.save(function (err) {
        if (err) console.log(err);
        else return;
      });
    }
  });
}

exports.toggle_hide = function (req, res) {
  Song.findById(req.params.id, function (err, song) {
    if (err) return res.send({ error: err });
    else {
      song.hidden = !song.hidden;
      song.save(function (err) {
        if (err) return res.send({ error: err });
        return res.send({ msg: `Song ${song.id} toggled` });
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
      track: req.body.track,
      album: req.body.album,
      year: req.body.year,
      genre: req.body.genre,
      comment: req.body.comment,
      hidden: req.body.hidden,
      copyRightViolation: req.body.copyRightViolation,
      noOfReviews: req.body.noOfReviews,
      avgOfRatings: req.body.avgOfRatings,
    }
  );

  song.save(function (err) {
    if (err) return res.send({ error: err });
    return res.send({ msg: song.id });
  });
};


//updates song
exports.update_song = function (req, res) {
  Song.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, song) {
    if (err) return res.send(err);
    res.send(song.id + ' udpated.')
  });
};

exports.toggle_song_copyright = function (req, res) {
  Song.findById(req.params.id, function (err, song) {
    if (err) return res.send(err);
    else {
      song.copyRightViolation = !song.copyRightViolation;
      song.save(function (err) {
        if (err) return res.send(err);
        return res.send(song.id);
      });
    }
  });
};

//getting all the songs that are copyrighted true 
exports.get_all_songs_copyrightViolated = function (req, res) {
  Song.find({ copyRightViolation: true }, function (err, songs) {
    if (err) return res.send(err);
    return res.send(songs);
  });
};

exports.get_all_songs = function (req, res) {
  Song.find(function (err, songs) {
    if (err) return res.send({ error: err });
    return res.send({ msg: songs });
  });
};

exports.get_all_avail_songs = function (req, res) {
  Song.find({ hidden: false }, function (err, songs) {
    if (err) return res.send({ error: err });
    return res.send({ msg: songs });
  });
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