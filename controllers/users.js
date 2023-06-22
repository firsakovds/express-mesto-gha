// controllers/users.js
// это файл контроллеров
//Контроллер в express также называют «последней мидлвэрой».
//Потому что внутри неё мы не вызываем next, а возвращаем ответ пользователю.
const User = require('../models/user');
//создать юзера
module.exports.createUsers = (req, res) => {
  const {name, about, avatar} = req.body;

   User.create({name, about, avatar})
    .then((user) => res.status(201).send({user}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации' });
        console.log(err)
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
      });
};
//найдем всех юзеров
module.exports.getUsers = (req, res) => {
   User.find({})
    .then((user) => res.status(201).send({user}))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
      });
};

//найдем конкретного юзера
module.exports.getUserId = (req, res) => {
  const {userId} = req.params;
  User.findById(userId)
  .then((user) => {
      if (!user) {
          res.status(404).send({message: 'Юзер не найден'});
      }
       res.status(200).send(user);
  })
  .catch(() => {
       res.status(500).send({message: 'Неверный id'});
  })
};



