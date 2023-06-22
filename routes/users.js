const router = require('express').Router();
const {getUsers, getUserId, createUsers} = require('../controllers/users');
//router.get('/users', getUsers);
//router.get('/users/:userId ', getUserId);
router.post('/users', createUsers);


module.exports = router;