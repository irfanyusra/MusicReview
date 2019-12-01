const User = require('../models/user.model');
const argon2 = require('argon2');

const config = require('../config');
const jwt = require('jsonwebtoken');

const passport = require('passport')

exports.test = function (req, res) {
  res.send('User controller works!');
};

//to create a user
exports.create_user = async function (req, res) {
  try {
    const hash = await argon2.hash(req.body.password);
    let user = new User(
      {
        email: req.body.email,
        name: req.body.name,
        isAdmin: req.body.isAdmin,
        hashPassword: hash,
        verified: req.body.verified,
        isActive: req.body.isActive
      }
    );

    user.save(function (err) {
      if (err) return res.send({
        msg:
          "The email already exists"
      });
      else {
        const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
          expiresIn: "45m"
        });
        const { iat, exp } = jwt.decode(token);
        console.log("Generated token for user: " + token);
        return res.send({ iat, exp, token });
      }
    });
  } catch (err) {
    return res.send({ msg: `err: cannot hash or get the password` });
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

exports.login = function (req, res, next) {
  let user = req.user;
  console.log(user);
  if (user.isActive == false)
    return res.send({ msg: `user is marked as deactivated` });
  if (user.verified == false)
    return res.send({ msg: `Please verify your emai` })
  else {
    if (!user) return res.send({ msg: `cannot find the username` });
    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, { expiresIn: '15m' });
    const { iat, exp } = jwt.decode(token);
    console.log(`Generated token for user: ` + token);
    return res.send({ iat, exp, token });
  }
}

exports.verify_user = function (req, res) {
  let hashedPass;
  User.findOne({ email: req.params.email }, async function (err, user) {
    if (err) return res.send(`err: cannot find the user: ${err}`);
    else {
      if (!user) return res.send(`cannot find the email`);
      hashedPass = user.hashPassword;
      try {
        if (await argon2.verify(hashedPass, req.body.password)) {
          const token = jwt.sign(user.toJSON(), config.JWT_SECRET, { expiresIn: '15m' })
          const { iat, exp } = jwt.decode(token);
          return res.send({ iat, exp, token })
          // return res.send(`passwords match`);  
        } else {
          return res.send(`incorrect username or password`);
        }
      } catch (err) {
        return res.send(`verification failed: ${err}`);
      }
    }
  });
};

exports.compare_token = function (req, res) {
  if (typeof (req.headers.authorization) === 'undefined')
    return res.status(401).send(`Access denied. Missing Authenticatio header`);
  else {
    const jwt_token = req.headers.authorization;
    try {
      jwt.verify(jwt_token, config.JWT_SECRET, function (err, paylod) { // Verify the token
        if (err) return res.send(`Token not verified: ${err}`);
        else return res.send(paylod);
      });
    } catch (ex) {
      return res.status(400).send(`Invalid token`);
    }
  }
}

exports.passport_test = function (req, res, next) {
  return res.send(`Passport authentication works: ${req}`);
};

exports.passport_jwt_test = function (req, res, next) {
  return res.send(`Success! You can not see this without a token`);
};

exports.login_error = function (req, res, next) {
  return res.send(`Error logging in`);
  //   res.send({message: "incorrect username or password"})
};

