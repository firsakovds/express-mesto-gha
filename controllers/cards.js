const Card = require('../models/card');
//найдем все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
   .then((card) => res.status(201).send({card}))
   .catch(() => {
     res.status(500).send({ message: 'Ошибка сервера' });
     });
};

module.exports.createCards = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;

   Card.create({name, link, owner})
    .then((card) => res.status(201).send({card}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации' });
        console.log(err)
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
      });
};


//module.exports.createCard = (req, res) => {
 // console.log(req.user._id); // _id станет доступен
//};