// controllers/users.js
// это файл контроллеров
//Контроллер в express также называют «последней мидлвэрой».
//Потому что внутри неё мы не вызываем next, а возвращаем ответ пользователю.
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpConflictError = require('../errors/httpConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UserNotFound = require('../errors/UserNotFound');
//создать юзера 2. Доработайте контроллер createUser
module.exports.createUsers = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
 // return User.create({ name, about, avatar, email, password: hash})
  bcrypt.hash(password, 10)
    .then((hash) => { return User.create({
      name, about, avatar, email, password: hash
    })})
    .then((user) => {
      return res.status(201).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Обработка ошибки
        return next(new HttpConflictError('пользователь пытается зарегистрироваться по уже существующему в базе email'))
    }


      if (err.name === "ValidationError") {
      //  return res.status(400).send({ message: "Ошибка валидации" });
        //console.log(err)
        return next(new BadRequestError('Ошибка валидации'))
      }// else {
        //return res.status(500).send({ message: "Ошибка сервера" });
      //}
      next(err);
    });
};

//3. Создайте контроллер login
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id },//Пейлоуд токена — зашифрованный в строку объект пользователя.
        'some-secret-key',
        { expiresIn: '7d'} // токен будет просрочен через 7 дней после создания
      );

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};

//6. Создайте контроллер и роут для получения информации о пользователе
module.exports.getCurrentUser = (req, res) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
       // return res.status(404).send({ message: "Юзер не найден" });
       throw new UserNotFound('Юзер не найден')
      } else {
        return res.status(200).send({user});
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        //return res.status(400).send({ message: "Неверный id" });
        return next(new BadRequestError('Неверный id'))
        //console.log(err)
      } //else {
       // return res.status(500).send({ message: "Ошибка сервера" });
      //}
      next(err)
    });
};












//найдем всех юзеров
module.exports.getUsers = (req, res) => {
  return User.find({})
    .then((user) => {
      return res.status(200).send({ user });
    })
    .catch(() => {
      return res.status(500).send({ message: "Ошибка сервера" });
    });
};
//найдем конкретного юзера
module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Юзер не найден" });
      }
      return res.status(200).send({user});
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Неверный id" });
        //console.log(err)
      } else {
        return res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};
//обновим профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Юзер не найден" });
      }
      return res.status(200).send({user});
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
        //console.log(err)
      } else {
        return res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};
//обновим аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Юзер не найден" });
      } else {
        return res.status(200).send({user});
      }

    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
        //console.log(err)
      } else {
        return res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};
