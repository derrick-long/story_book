const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

const port = process.env.PORT || 5000;
//passport config
require('./config/passport')(passport);
//load routes
const auth = require('./routes/auth');

app.get('/', (req, res)=> {
  res.send('up and running!');
});
//routes

app.use('/auth', auth);






app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
