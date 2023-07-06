const Card = require("../models/card");
const HttpConflictError = require('../errors/httpConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UserNotFound = require('../errors/UserNotFound');
const HttpForbiddenError = require('../errors/HttpForbiddenError')
//найдем все карточки
module.exports.getCards = (req, res, next) => {
  return Card.find({})
    .then((card) => {
      return res.status(200).send({ card });
    })
    .catch((err) => {
      //return res.status(500).send({ message: "Ошибка сервера" });
      next(err)
    });
};
//создадим каточку
module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => {
      return res.status(201).send({ card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError('Ошибка валидации'))
        //return res.status(400).send({ message: "Ошибка валидации" });
        //console.log(err)
      }// else {
       // return res.status(500).send({ message: "Ошибка сервера" });
      //}
      next(err)
    });
};
//удалим карточку
module.exports.deleteCards = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        throw new UserNotFound('Карточка не найдена')
        //return res.status(404).send({ message: "Карточка не найдена" });
      } if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new HttpForbiddenError('Карточка не ваша')
      } else {
        return res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError('Неверный id'))
       // return res.status(400).send({ message: "Неверный id" });
        //console.log(err)
      } //else {
        //return res.status(500).send({ message: "Ошибка сервера" });
      //}
      next(err)
    });
};
// поставим лайк
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
       // return res.status(404).send({ message: "Карточка не найдена" });
       throw new UserNotFound('Карточка не найдена')
      } else {
        return res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        //return res.status(400).send({ message: "Неверный id" });
        return next(new BadRequestError('Неверный id'))
        //console.log(err)
      }// else {
       // return res.status(500).send({ message: "Ошибка сервера" });
      //}
      next(err);
    });
};
//уберем лайк
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
       // return res.status(404).send({ message: "Карточка не найдена" });
       throw new UserNotFound('Карточка не найдена')
      } else {
        return res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError('Неверный id'))
        //return res.status(400).send({ message: "Неверный id" });
        //console.log(err)
      }// else {
       // return res.status(500).send({ message: "Ошибка сервера" });
      //}
      next(err)
    });
};
//module.exports.createCard = (req, res) => {
// console.log(req.user._id); // _id станет доступен
//};
