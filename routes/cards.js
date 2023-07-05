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
  body: Joi.object().keys({
    //email: Joi.string().required().email(),
    //password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    owner: Joi.string().min(2).max(30),
    link: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/)
  }),
}), deleteCards);





router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);
module.exports = router;
