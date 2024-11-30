const Item = require('../models/item');

const createItem = async (req, res) => {
  const { name, price, available } = req.body;
  try {
    const item = new Item({ name, price, available });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

const getItemsBelowPrice = async (req, res) => {
  const { price } = req.query;

  try {
    const items = await Item.find({ price: { $lt: price } });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

const getAvailableItems = async (req, res) => {
  try {
    const items = await Item.find({ available: true });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};

module.exports = { createItem, getItemsBelowPrice, getAvailableItems };
