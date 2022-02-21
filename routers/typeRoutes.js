const express = require('express');
const router = express.Router();
const TypeController = require('../controllers/TypeControllers');

//create new product
router.post('/create', TypeController.create);

//get all products
router.get('/all', TypeController.all);

//get one product
router.get('/one/:type_id', TypeController.one);

//update product by id
router.put('/update/:type_id', TypeController.update);

//delete product by id
router.delete('/delete/:type_id', TypeController.delete);

module.exports = router;