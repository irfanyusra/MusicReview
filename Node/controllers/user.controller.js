const User = require('../models/user.model');

//to create a user
exports.create_user = function (req, res) {
  console.log("here");
  let user = new User(
    {
      email: req.body.email,
      name: req.body.name,
      reviewsId: req.body.reviewsId,
      isAdmin: req.body.isAdmin,
      password: req.body.password,
      // verified: { type: Boolean },
      isActive: req.body.isActive      
   
    }
  );

  user.save(function (err) {
    if (err) return res.send(err);
    res.send('user Created successfully')
  })
};


//getting all the users 
exports.get_all_users = function (req, res) {
  User.find(function (err, user) {
    res.send(user);
  })
};

//getting a user using id 
exports.get_user = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.send('Error for finding the user');
    res.send(user);
  })
};


//getting a user using name
exports.get_user_email = function (req, res) {
  User.find({"email":req.params.email}, (err, user) => {
    if (err) return res.send('Error in finding the user');
    res.send(user);
  })
};

//updates user
exports.update_user = function (req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
    if (err) return res.send(err);
    res.send(user + ' udpated.');
  });
};

//deletes user 
exports.delete_user = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) return res.send(err);
    res.send('Deleted successfully!');
  })
};