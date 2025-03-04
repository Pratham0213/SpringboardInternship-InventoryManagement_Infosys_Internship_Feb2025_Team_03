const { Router } = require('express');
const { getProducts } = require('../controllers/product.controller');


const router = Router();

router.get('/getproducts', getProducts);


module.exports = router;