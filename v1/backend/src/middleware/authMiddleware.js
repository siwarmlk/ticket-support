const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant. Connectez-vous.' });
  }

  const token = header.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ message: 'JWT_SECRET non configure sur le serveur.' });
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = { id: payload.sub, username: payload.username };
    return next();
  } catch {
    return res.status(401).json({ message: 'Token invalide ou expire.' });
  }
};

module.exports = { authMiddleware };
