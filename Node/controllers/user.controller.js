const User = require('../models/user.model');
const argon2 = require('argon2');

exports.test = function (req, res) {
  res.send('User controller works!');
};

//to create a user
exports.create_user = async function (req, res) {
  try {
    const hash = await argon2.hash(req.body.password)
    let user = new User(
      {
        email: req.body.email,
        name: req.body.name,
        reviewsId: req.body.reviewsId,
        isAdmin: req.body.isAdmin,
        hashPassword: hash,
        verified: req.body.verified,
        isActive: req.body.isActive
      }
    );

    user.save(function (err) {
      if (err) return res.send(err);
      return res.send(`User Created successfully: ` + user._id);
    });
  } catch (err) {
    res.send("err: cannot hash or get the password")
  }

};

exports.toggle_admin = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.send(err);
    else {
      user.isAdmin = !user.isAdmin;
      user.save(function (err) {
        if (err) return res.send('error toggling admin status for the user: ${err}');
        return res.send('user admin toggled successfully');
      });
    }
  });
};

exports.toggle_active = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.send(err);
    else {
      user.isActive = !user.isActive;
      user.save(function (err) {
        if (err) return res.send(`Error toggling active for the user: ${err}`);
        return res.send('user active toggled successfully');
      });
    }
  });
};

//getting all the users 
exports.get_all_users = function (req, res) {
  User.find(function (err, user) {
    if (err) return res.send(err);
    return res.send(user);
  })
};

//getting a user using id 
exports.get_user = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.send('Error for finding the user');
    return res.send(user);
  })
};


//getting a user using name
exports.get_user_email = function (req, res) {
  User.find({ "email": req.params.email }, (err, user) => {
    if (err) return res.send('Error in finding the user');
    return res.send(user);
  })
};

//updates user
exports.update_user = function (req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
    if (err) return res.send(err);
    return res.send(user + ' udpated.');
  });
};

//deletes user 
exports.delete_user = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) return res.send(err);
    return res.send('Deleted successfully!');
  })
};

exports.verify_user = function (req, res) {
  let hashedPass;
  User.findOne({ email: req.params.email }, async function (err, user) {
    if (err)
      return res.send(`err: cannot find the user: ${err}`);
    else {
      hashedPass = user.hashPassword;
      try {
        if (await argon2.verify(hashedPass, req.body.password)) {
          return res.send("passwords match");
        } else {
          return res.send("incorrect username or password");
        }
      } catch (err) {
        return res.send(`verification failed: ${err}`);
      }
    }
  });
};