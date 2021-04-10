const router = require('express').Router();

const {
  getUsers, getUserById, createUser, updateUser, updateAvatar, login, getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

const {
  validateGetUsers,
  validateGetUserById,
  validateLogin,
  validateUpdateUserAvatar,
  validateUpdateUser,
} = require('../middlewares/validatons');

router.post('/signin', validateLogin, login);

router.post('/signup', validateLogin, createUser);

router.use(auth);

router.get('/users', validateGetUsers, getUsers);

router.get('/users/me', validateGetUserById, getCurrentUser);

router.patch('/users/me', validateUpdateUser, updateUser);

router.patch('/users/me/avatar', validateUpdateUserAvatar, updateAvatar);

router.get('/users/:userId', validateGetUserById, getUserById);

module.exports = router;
