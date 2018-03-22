const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req,res)=> {
  res.render('stories/index');
});



module.exports = router;
