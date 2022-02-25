const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminControllers');
const ValidateInput = require('../middlewares/users');
const Authentication = require('../middlewares/authentication');

//create new admin
router.post('/register', ValidateInput.ValidateUser, AdminController.register);

// login admin with credentials 
router.post('/login', Authentication.verifyUser, AdminController.login);

// logout 
router.post('/logout', Authentication.verifyUser, AdminController.logout);
//get all admins
router.get('/', AdminController.all);

//get one admin
router.get('/id/:admin_id', AdminController.one);

//update admin by id
router.put('/update/:admin_id', AdminController.update);

//delete admin account by id
router.delete('/delete/:admin_id', AdminController.delete);

module.exports = router;