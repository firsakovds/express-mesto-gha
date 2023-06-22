// controllers/users.js
// это файл контроллеров
//Контроллер в express также называют «последней мидлвэрой».
//Потому что внутри неё мы не вызываем next, а возвращаем ответ пользователю.
const User = require('../models/user');

module.exports.createUsers = (req, res) => {
  const {name} = req.body;

  User.create({name})
    .then((user) => res.send({data: user}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(500).send({ message: 'Ошибка валидации' });
        console.log(err)
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
      });
};


