const express = require('express');
const router = express.Router();
const passport = require('passport');



router.get('/', (req, res)=> {
  res.send('up and running!');
});

router.get('/dashboard', (req,res) => {
  res.send('dashboard');
});


module.exports = router;
