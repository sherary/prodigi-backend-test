const express = require('express');
const router = express.Router();
const ValidateUserInput = require('../middlewares/users')
const UserController = require('../controllers/UserControllers');

//create new user
router.post('/register', ValidateUserInput.ValidateUser, UserController.register);

//get all users
router.get('/', UserController.all);//ex for pagination: http://localhost:3000/users/?page=1

//get one user
router.get('/:user_id', UserController.one);

//update user by id
router.put('/update/:user_id', UserController.update);

//admin only: delete user by id
router.delete('/delete/:user_id', UserController.delete);

module.exports = router;