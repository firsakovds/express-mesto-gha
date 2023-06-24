const Card = require('../models/card');
//найдем все карточки
module.exports.getCards = (req, res) => {
  return Card.find({})
   .then((card) => { return res.status(200).send({card})})
   .catch(() => {
    return res.status(500).send({ message: 'Ошибка сервера' });
     });
};

module.exports.createCards = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;

  return Card.create({name, link, owner})
    .then((card) => {return res.status(201).send({card})})
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации' });
        //console.log(err)
      } else {
        return res.status(500).send({ message: 'Ошибка сервера' });
      }
      });
};
//удалим карточку
module.exports.deleteCards = (req, res) => {
  const {cardId} = req.params;
  return  Card.findByIdAndDelete(cardId)
  .then((card) => {
      if (!card) {
        return res.status(404).send({message: 'Карточка не найдена'});
      }
      return res.status(200).send(card);
  })
  .catch(() => {
    return res.status(500).send({message: 'Неверный id'});
  })
};

// поставим лайк
module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)


//уберем лайк
module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)


//module.exports.createCard = (req, res) => {
 // console.log(req.user._id); // _id станет доступен
//};