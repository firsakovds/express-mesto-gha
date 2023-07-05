const router = require("express").Router();
const {celebrate, Joi} = require('celebrate');
const {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
router.get("/cards", getCards);
//router.post("/cards", createCards);
router.post("/cards", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    //owner: Joi.string().min(2).max(30),
    link: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/)
  }),
}), createCards);



//router.delete("/cards/:cardId", deleteCards);
router.delete("/cards/:cardId", celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    postId: Joi.string().alphanum().length(24),
  }),
}), deleteCards);





//router.put("/cards/:cardId/likes", likeCard);
router.put("/cards/:cardId/likes", celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    postId: Joi.string().alphanum().length(24),
  }),
}), likeCard);


//router.delete("/cards/:cardId/likes", dislikeCard);
router.delete("/cards/:cardId/likes", celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    postId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;
