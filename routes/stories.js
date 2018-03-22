const express = require('express');
const router = express.Router();
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');


//stories index
router.get('/', (req,res)=> {
  res.render('stories/index');
});

//add story form

router.get('/add', ensureAuthenticated, (req,res)=> {
  res.render('stories/add');
});

module.exports = router;
