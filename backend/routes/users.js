const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsersList,
  currentUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsersList);

router.get('/me', currentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), updateUserAvatar);

module.exports = router;
