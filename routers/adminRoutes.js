const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminControllers');

//create new admin
router.post('/register', AdminController.register);

//get all admins
router.get('/', AdminController.all);

//get one admin
router.get('/id/:admin_id', AdminController.one);

//update admin by id
router.put('/update/:admin_id', AdminController.update);

//delete admin account by id
router.delete('/delete/:admin_id', AdminController.delete);

module.exports = router;