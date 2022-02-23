const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionControllers');

//create new transaction
router.post('/create', TransactionController.create);

//view one transaction
router.get('/one', TransactionController.one);

//view all transactions
router.get('/all', TransactionController.all);