const router = require("express").Router();
const {
  getUsers,
  getUserId,
  createUsers,
  updateUser,
  updateAvatar,
  getCurrentUser
} = require("../controllers/users");
router.get("/users", getUsers);
router.get("/users/:userId", getUserId);
//router.post("/users", createUsers);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);
//6. Создайте контроллер и роут для получения информации о пользователе
router.get("/users/me", getCurrentUser)
module.exports = router;
