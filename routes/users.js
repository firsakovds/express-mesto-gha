const router = require('express').Router();
const {getUsers, getUserId, createUsers, updateUser, updateAvatar} = require('../controllers/users');
router.get('/users', getUsers);
router.get('/users/:userId', getUserId);
router.post('/users', createUsers);

router.patch('/users/me', updateUser);
router.patch('/users/me/avatar ', updateAvatar);

module.exports = router;