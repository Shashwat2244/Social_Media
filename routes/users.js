const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_control');

router.get('/profile/:id', passport.checkAuthentication , usersController.profile);
router.post('/update/:id', passport.checkAuthentication , usersController.update);

router.get('/sign-up',usersController.signup);
router.get('/sign-in',usersController.signin);

router.post('/create',usersController.create);
router.post('/createSession', passport.authenticate(
    'local',{failureRedirect: '/users/sign-in'},
) , usersController.createSession);

router.get('/sign-out',usersController.destroySession);


module.exports = router;