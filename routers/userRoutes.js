const express = require('express');
const router = express.Router();
const ValidateUserInput = require('../middlewares/users')
const UserController = require('../controllers/UserControllers');
const Authentication = require('../middlewares/authentication')

//create new user
router.post('/register', ValidateUserInput.ValidateUser, UserController.register);

// login with credentials
router.post('/login', Authentication.verifyUser, UserController.login);

// user logout
router.post('/logout', Authentication.verifyUser, UserController.logout);

//get all users
router.get('/', UserController.all);//ex for pagination: http://localhost:3000/users/?page=1

//get one user
router.get('/id/:user_id', UserController.one);

//update user by id
router.put('/update/:user_id', UserController.update);

//admin only: delete user by id
router.delete('/delete/:user_id', UserController.delete);

module.exports = router;