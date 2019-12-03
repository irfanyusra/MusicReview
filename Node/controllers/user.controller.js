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
    if (err) return res.send({error: err});
    else {
      user.isAdmin = !user.isAdmin;
      user.save(function (err) {
        if (err) return res.send({error: 'error toggling admin status for the user: ${err}'});
        return res.send({msg: 'user admin toggled successfully'});
      });
    }
  });
};

exports.toggle_active = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.send({error: err});
    else {
      user.isActive = !user.isActive;
      user.save(function (err) {
        if (err) return res.send({error:`Error toggling active for the user: ${err}`});
        return res.send({msg: 'user active toggled successfully'});
      });
    }
  });
};

//getting all the users 
exports.get_all_users = function (req, res) {
  console.log("hereee");
  User.find(function (err, users) {
    if (err) return res.send({error: err});
    return res.send({msg: users});
  })
};

//getting a user using id 
// exports.get_user = function (req, res) {
//   User.findById(req.params.id, (err, user) => {
//     if (err) return res.send({error: 'Error for finding the user'});
//     return res.send({msg: user});
//   })
// };


//getting a user using name
exports.get_user_email = function (req, res) {
  User.find({ "email": req.params.email }, (err, user) => {
    if (err) return res.send({error: 'Error in finding the user'});
    return res.send({msg: user});
  })
};

//updates user
// exports.update_user = function (req, res) {
//   User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
//     if (err) return res.send({error: err});
//     return res.send({msg: user._id + ' udpated.'});
//   });
// };

//deletes user 
// exports.delete_user = function (req, res) {
//   User.findByIdAndRemove(req.params.id, function (err) {
//     if (err) return res.send({error: err});
//     return res.send({msg: 'Deleted successfully!'});
//   })
// };

exports.login = function (req, res, next) {
  let user = req.user;
  console.log(user);
  if (user.isActive == false)
    return res.send({ msg: `user is marked as deactivated` });
  if (user.verified == false)
    return res.send({ msg: `Please verify your email` })
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
    if (err) return res.send({error: `err: cannot find the user: ${err}`});
    else {
      if (!user) return res.send({error: `cannot find the email`});
      hashedPass = user.hashPassword;
      try {
        if (await argon2.verify(hashedPass, req.body.password)) {
          const token = jwt.sign(user.toJSON(), config.JWT_SECRET, { expiresIn: '15m' })
          const { iat, exp } = jwt.decode(token);
          return res.send({ iat, exp, token })
          // return res.send(`passwords match`);  
        } else {
          return res.send({msg: `incorrect username or password`});
        }
      } catch (err) {
        return res.send({error: `verification failed: ${err}`});
      }
    }
  });
};

exports.compare_token = function (req, res) {
  if (typeof (req.headers.authorization) === 'undefined')
    return res.status(401).send({msg: `Access denied. Missing Authentication header`});
  else {
    const jwt_token = req.headers.authorization;
    try {
      jwt.verify(jwt_token, config.JWT_SECRET, function (err, paylod) { // Verify the token
        if (err) return res.send({error: `Token not verified: ${err}`});
        else return res.send(paylod);
      });
    } catch (ex) {
      return res.status(400).send({msg:`Invalid token`});
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
  return res.send({msg: `Please try to log in again`});
};

