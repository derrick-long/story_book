const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const port = process.env.PORT || 5000;
const path = require('path');
const bodyParser = require('body-parser');




// load  models
require('./models/user');
require('./models/story');


//passport config

require('./config/passport')(passport);

//load routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//load keys
const keys = require('./config/keys');

//handlebars helpers
const {
  truncate,
  stripTags,
  formatDate,
  select
} = require('./helpers/hbs');


//body parser middle
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//mongoose connect
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI,{

})
  .then(() => console.log('MongoDB connected'))
  .catch(err=> console.log(err));

//handlebars

app.engine('handlebars', exphbs({
  helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formatDate: formatDate,
    select: select
  },
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');


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

//global vars
app.use((req, res, next)=> {
  res.locals.user = req.user || null;
  next();
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);





app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
