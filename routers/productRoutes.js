const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductControllers');

// create new product
router.post('/create', ProductController.create);

// view one product
router.get('/id/:product_id', ProductController.one);

// view all product
router.get('/', ProductController.all);

// search product by name
router.get('/search', ProductController.searchBy)

// update one product by id
router.put('/update/:product_id', ProductController.update);

// delete one product by id
router.delete('/delete/:product_id', ProductController.delete);

module.exports = router;