const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Dodawanie, edytowanie, usuwanie przedmiotów z zamówienia
router.post('/:orderId/items', authenticateToken, orderController.addItemToOrder);
router.put('/:orderId/items/:itemId', authenticateToken, orderController.updateItemInOrder);
router.delete('/:orderId/items/:itemId', authenticateToken, orderController.removeItemFromOrder);

// Wyszukiwanie przedmiotu o danym ID
router.get('/:orderId/items', authenticateToken, orderController.getItemById);

// Walidacja zamówienia
router.post('/validate', authenticateToken, orderController.validateOrder);

module.exports = router;
