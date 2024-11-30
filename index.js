import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';

const app = express();
const PORT = 5000;

app.use(express.json()); 
app.use('/api/users', usersRouter); 

mongoose.connect('mongodb://localhost:27017/nord-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB at nord-api'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
