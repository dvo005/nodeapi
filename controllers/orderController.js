import Order from '../models/order.js';
import Item from '../models/item.js';

const addItemToOrder = async (req, res) => {
  const { orderId } = req.params;
  const { itemId } = req.body;

  try {
    const order = await Order.findById(orderId);
    const item = await Item.findById(itemId);

    if (!item || !order) {
      return res.status(404).json({ message: 'Przedmiot lub zamówienie nie znalezione' });
    }

    order.items.push(item._id);
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

const deleteItemFromOrder = async (req, res) => {
  const { orderId, itemId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Zamówienie nie znalezione' });
    }

    order.items.pull(itemId);
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

const validateOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('items');
    if (!order) {
      return res.status(404).json({ message: 'Zamówienie nie znalezione' });
    }

    let totalAmount = 0;
    for (let item of order.items) {
      totalAmount += item.price;
    }

    order.totalAmount = totalAmount;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

export { addItemToOrder, deleteItemFromOrder, validateOrder };
