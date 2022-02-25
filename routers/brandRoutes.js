const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/BrandControllers');

//create new product
router.post('/create', BrandController.create);

//get all products
router.get('/', BrandController.all);

//get one product
router.get('/id/:brand_id', BrandController.one);

//update product by id
router.put('/update/:brand_id', BrandController.update);

//delete product by id
router.delete('/delete/:brand_id', BrandController.delete);

module.exports = router;