const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers');

//create new user
router.post('/register', UserController.register);

//get all users
router.get('/all', UserController.all);

//get one user
router.get('/one/:user_id', UserController.one);

//user profile
router.get('/profile/:user_id', UserController.own);

//update user by id
router.put('/update/:user_id', UserController.update);

//admin only: delete user by id
router.delete('/delete/:user_id', UserController.delete);

module.exports = router;