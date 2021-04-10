const JWT_SECRET = 'pavel001';
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация.');
    }
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new ForbiddenError('Недостаточно прав.');
    }
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
};
