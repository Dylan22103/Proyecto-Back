const jwt = require('jsonwebtoken');

const secretKey = 'api_cine';

const generateAccessToken = (userData) => {
  return jwt.sign(userData, secretKey, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, secretKey, (err, userData) => {
    if (err) {
      return res.sendStatus(403); 
    }
    req.userData = userData; 
    next(); 
  });
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.userData && req.userData.Rol === role) {
      next(); // El usuario tiene el rol correcto, continuar
    } else {
      res.sendStatus(403); // El usuario no tiene el rol necesario
    }
  };
};

module.exports = { generateAccessToken, authenticateToken, authorizeRole };