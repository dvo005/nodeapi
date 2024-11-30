import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Lista przedmiotów');
});


export { router as itemRoutes };  
