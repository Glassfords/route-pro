const express = require('express');
const Datastore = require('nedb');
const router = express.Router();

const users = new Datastore({ filename: './db/users.db', autoload: true });

// User registration
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  // TODO: Add input validation
  const newUser = {
    username: req.body.username,
    password: req.body.password,
  };

  users.insert(newUser, (err, user) => {
    if (err) {
      // TODO: Add proper error handling
      console.error(err);
      return res.redirect('/users/register');
    }
    req.session.user = user;
    res.redirect('/map');
  });
});

// User login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  // TODO: Add input validation
  users.findOne({ username: req.body.username }, (err, user) => {
    if (err || !user || user.password !== req.body.password) {
      // TODO: Add proper error handling
      return res.redirect('/users/login');
    }
    req.session.user = user;
    res.redirect('/map');
  });
});
