const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authorization = req.headers.token;
  if (authorization) {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) {
        const error = new Error('Token is not valid!');
        error.status = 403;
        throw error;
      }
      req.user = decodedToken;
      next();
    });
  } else {
    const error = new Error('You are not authenticated!');
    error.status = 401;
    throw error;
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
