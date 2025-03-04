const { Router } = require('express');
const { addSupplier, getSuppliers } = require('../controllers/supplier.controller');


const router = Router();

router.get('/getSuppliers', getSuppliers);
router.post('/addSupplier', addSupplier);


module.exports = router;