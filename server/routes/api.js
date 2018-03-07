const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const ProifleInfo = require('../models/profileInfo');

//////////////////////
// Protected Routes
//////////////////////

router.get('/', (req, res) => {
  res.send('api works');
});

//////////////////////
// User Routes
//////////////////////

// Register an account
router.post('/register', function(req, res, next) {
  console.log('Register a user');
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save(function(err, insertedUser) {
      if(err) {
        console.log('Error registering the user!');
      } else {
        res.json(insertedUser);
      }
  });
});

// Authenticate user
router.post('/authenticate', function(req, res, next) {

    console.log('Here 1');

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;

      console.log('User: ', user);

      if (!user) {
        console.log(user);
        return res.json({success: false, msg: 'User not found'});
      } else {

        if(user.password === password) {
          const token = jwt.sign(user, 'config.secret', {
            expiresIn: 604800 // 1 week
          });

          res.json({
            success: true,
            token: 'JTW' + token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          });
        }
        else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      }
    });
});

//////////////////////
// Video Routes
//////////////////////

// Find all videos
router.get('/videos', function(req, res) {
  console.log('Get request for all videos');
  Video.find({})
  .exec(function(err, videos) {
    if(err) {
      console.log('Error retrieving videos');
    } else {
      res.json(videos);
    }
  })

});

// Find one video
router.get('/videos/:id', function(req, res) {
  console.log('Get request for one video');
  Video.findById(req.params.id)
  .exec(function(err, video) {
    if(err) {
      console.log('Error retrieving video');
    } else {
      res.json(video);
    }
  })

});

// Save a video
router.post('/video', function(req, res) {
  console.log('Post a video');
  const newVideo = new Video();
  newVideo.title = req.body.title,
  newVideo.description = req.body.description,
  newVideo.imageUrl = req.body.imageUrl,
  newVideo.videoUrl = req.body.videoUrl,
  newVideo.publishedAt = req.body.publishedAt
  newVideo.save(function(err, insertedVideo) {
      if(err) {
        console.log('Error saving video');
      } else {
        res.json(insertedVideo);
      }
  });
});

// Delete a video
router.delete('/video/:id', function(req, res) {
  console.log('Deleting a video');
  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
    if(err) {
      res.send('Error deleting video');
    } else {
      res.json(deletedVideo);
    }
  });
});

//////////////////////
// ProfileInfo Routes
//////////////////////

// Find one video
router.get('/profile-info/:id', function(req, res) {
  console.log('Get request for one profile data');
  ProifleInfo.findById(req.params.id)
  .exec(function(err, profiledata) {
    if(err) {
      console.log('Error retrieving profile data');
    } else {
      res.json(profiledata);
    }
  })

});

// Save a video
router.post('/video', function(req, res) {
  console.log('Post a video');
  const newProfile = new ProifleInfo();
  newProfile.profileImageUrl = req.body.profileImageUrl,
  newProfile.name = req.body.name,
  newProfile.age = req.body.age,
  newProfile.bio = req.body.bio,
  newProfile.save(function(err, insertedProfile) {
      if(err) {
        console.log('Error saving video');
      } else {
        res.json(insertedVideo);
      }
  });
});

/////////////////////////////
// Logout and Testing Routes
/////////////////////////////

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;
