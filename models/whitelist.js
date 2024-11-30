const mongoose = require('mongoose');

const whitelistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Whitelist = mongoose.model('Whitelist', whitelistSchema);

module.exports = Whitelist;
