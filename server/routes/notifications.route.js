const { Router } = require('express');
const { getNotifications, delivered, delay, returned } = require('../controllers/notifications.controller');



const router = Router();

router.get('/getNotifications', getNotifications);
router.post('/delivered', delivered);
router.post('/delay', delay);
router.post('/returned', returned);



module.exports = router;