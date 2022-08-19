const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) res.status(403).json('Token is not valid!');
      req.user = decodedToken;
      next();
    });
  } else {
    return res.status(401).json('You are not authenticated!');
  }
};

// check if user is logged in and has the right permissions
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      const error = new Error('Unauthorized');
      error.status = 403;
      throw error;
    }
  });
};
// check if user is an admin and has the right permissions
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      const error = new Error('Unauthorized');
      error.status = 403;
      throw error;
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
