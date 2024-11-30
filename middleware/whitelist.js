
import mongoose from 'mongoose';

const whitelistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

const Whitelist = mongoose.model('Whitelist', whitelistSchema);

export default Whitelist; y
