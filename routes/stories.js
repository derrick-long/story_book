const express = require('express');
const router = express.Router();
const passport = require('passport');
const {ensureAuthenticated} = require('../helpers/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
//stories index
router.get('/', (req,res)=> {
  Story.find({status:'Public'})
    .then(stories =>{
      res.render('stories/index',{
        stories: stories
      });
    });
});

//add story form

router.get('/add', ensureAuthenticated, (req,res)=> {
  res.render('stories/add');
});


//make story hit DB

router.post('/', (req, res)=> {
  let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else{
    allowComments = false;
  }

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  };

  //create story

  new Story(newStory)
  .save()
  .then(story => {
    res.redirect(`/stories/show/${story.id}`);
  });

});

module.exports = router;
