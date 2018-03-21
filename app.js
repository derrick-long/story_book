const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const port = process.env.PORT || 5000;

// load user model
require('./models/user');

//passport config

require('./config/passport')(passport);

//load routes

const auth = require('./routes/auth');

//load keys
const keys = require('./config/keys');
//mongoose connect
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI,{

})
  .then(() => console.log('MongoDB connected'))
  .catch(err=> console.log(err));


// cookie parser
app.use(cookieParser());

//session


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));


//passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res)=> {
  res.send('up and running!');
});
//routes

app.use('/auth', auth);





app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
