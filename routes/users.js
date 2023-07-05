const router = require("express").Router();
const {celebrate, Joi} = require('celebrate');
const {
  getUsers,
  getUserId,
  createUsers,
  updateUser,
  updateAvatar,
  getCurrentUser
} = require("../controllers/users");
router.get("/users", getUsers);
//router.get("/users/:userId", getUserId);
router.get("/users/:userId", celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserId);




//router.post("/users", createUsers);
//router.patch("/users/me", updateUser);
router.patch("/users/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    //link: Joi.string().required().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/)
  }),
}), updateUser);




//router.patch("/users/me/avatar", updateAvatar);
router.patch("/users/me/avatar", celebrate({
  body: Joi.object().keys({
    //name: Joi.string().min(2).max(30).required(),
    //about: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/im),
  }),
}), updateAvatar);

//6. Создайте контроллер и роут для получения информации о пользователе
router.get("/users/me", getCurrentUser)
module.exports = router;
