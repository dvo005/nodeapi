const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const { createItem, getItemsBelowPrice, getAvailableItems } = require('../controllers/itemController');
const router = express.Router();

router.post('/', authenticateToken, createItem);
router.get('/below-price', authenticateToken, getItemsBelowPrice);
router.get('/available', authenticateToken, getAvailableItems);

module.exports = router;
