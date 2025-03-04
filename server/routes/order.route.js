const { Router } = require('express');
const { placeOrder, getOrders } = require('../controllers/order.controller');


const router = Router();

router.post('/placeOrder', placeOrder);
router.get('/getOrders', getOrders);



module.exports = router;