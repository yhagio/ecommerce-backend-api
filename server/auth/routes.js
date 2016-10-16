const router = require('express').Router();
const verifyUser = require('./auth').verifyUser;
const decodeToken = require('./auth').decodeToken;
// const getSignedInUserData = require('./auth').getSignedInUserData;
const controller = require('./controller');
const getSingleUser = require('../api/users/controller').getSingleUser;

// before we send back a jwt, lets check
// user's email and password match what is in the DB
router.post('/signin', verifyUser(), controller.signin);

// Get user data for already-signed-in user
router.get('/userdata', decodeToken(), getSingleUser);

module.exports = router;
