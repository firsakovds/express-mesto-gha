const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
//5. Сделайте мидлвэр для авторизации
const handleAuthError = (res, next) => {
  return next(new UnauthorizedError('Необходима авторизация'));
  //res.status(401).send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
