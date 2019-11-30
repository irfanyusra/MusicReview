
//all the packages 
const express = require('express'); //express
const bodyParser = require('body-parser');
const app = express(); //our app

const passport = require('passport');
const configPassport = require('./Config/passport');

const openRoute = require('./routes/open.route'); // Imports routes for the products
const secureRoute = require('./routes/secure.route'); // Imports routes for the products
const adminRoute = require('./routes/admin.route'); // Imports routes for the products

// Set up mongoose connection
const mongoose = require('mongoose');
const dev_db_url = "mongodb+srv://yusra:yusra@cluster0-v75ag.mongodb.net/Lab5?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// mongoose.Promise = global.Promise;

// app.use(function(req, res, next) {
//      res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/open', openRoute);
app.use('/api/secure', secureRoute);
// app.use('/api/admin', adminRoute);
app.use('/api/admin', passport.authenticate('jwt', { session: false }), adminRoute);


let port = process.env.PORT || 8080;       
app.listen(port, () => {
  console.log(`Server is up and running on port number  ${port}`);
});







