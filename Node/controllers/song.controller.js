const Song = require('../models/song.model');

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
      reviewsId: req.body.reviewsId
      
    }
  );

  song.save(function (err) {
    if (err) return res.send(err);
    res.send('song Created successfully')
  })
};


//getting all the songss 
exports.get_all_songs = function (req, res) {
  Song.find(function (err, song) {
    res.send(song);
  })
};

//getting a song using id 
exports.get_song = function (req, res) {
  Song.findById(req.params.id, (err, song) => {
    if (err) return res.send('Error for finding the song');
    res.send(song);
  })
};


//getting a song using name
exports.get_song_title = function (req, res) {
  Song.find({"name":req.params.name}, (err, song) => {
    if (err) return res.send('Error in finding the song');
    res.send(song);
  })
};

//updates song
exports.update_song = function (req, res) {
  Song.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, song) {
    if (err) return res.send(err);
    res.send(song + ' udpated.');
    console.log("updating song");
  });
};

//deletes song 
exports.delete_song = function (req, res) {
  Song.findByIdAndRemove(req.params.id, function (err) {
    if (err) return res.send(err);
    res.send('Deleted successfully!');
  })
};