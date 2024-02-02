const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// Все пользователи
module.exports.getUsersList = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send({
        data: user,
      });
    })
    .catch((err) => next(err));
};

// Пользователь по ID
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c таким ID не найден');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

// Создаем пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(200).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
          email: user.email,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Этот e-mail уже зарегистрирован'));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError('Некорректные данные'));
          return;
        }
        next(err);
      }));
};

// Обновление профиля
module.exports.updateUser = (req, res, next) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

// Обновление аватара
module.exports.updateUserAvatar = (req, res, next) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true, select: { avatar } })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

// Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      } else {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (matched) {
              const token = jwt.sign(
                { _id: user._id },
                'some-secret-key', // Ключ
                { expiresIn: '7d' },
              );
              res.send({
                token,
              });
            } else {
              throw new UnauthorizedError('Неправильные почта или пароль');
            }
          });
      }
    })
    .catch((err) => next(err));
};

// Текущий пользователь
module.exports.currentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      res.status(200).send({
        user,
      });
    })
    .catch(next);
};
