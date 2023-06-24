// controllers/users.js
// это файл контроллеров
//Контроллер в express также называют «последней мидлвэрой».
//Потому что внутри неё мы не вызываем next, а возвращаем ответ пользователю.
const User = require("../models/user");
//создать юзера
module.exports.createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => {
      return res.status(201).send({ user });
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
      return res.status(200).send(user);
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
      return res.status(200).send(user);
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
      }
      return res.status(200).send(user);
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
