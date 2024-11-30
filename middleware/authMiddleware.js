// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Whitelist from '../models/whitelist.js'; // Import z odpowiednią ścieżką

const JWT_SECRET_KEY = 'your_jwt_secret_key';

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Brak tokenu autoryzacyjnego' });
  }

  try {
    const whitelistToken = await Whitelist.findOne({ token });
    if (whitelistToken) {
      req.user = { id: whitelistToken.userId }; // Jeśli token znajduje się na liście białych tokenów
      return next();
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Nieprawidłowy token' });
      }
      req.user = user; // Jeśli token jest poprawny
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: 'Błąd serwera' });
  }
};

export default authenticateToken;
