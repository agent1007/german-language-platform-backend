const Questions = require('../models/questions');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getQuestions = (req, res, next) => {
  Questions.find({}).then((questions) => res.send(questions))
    .catch((err) => next(err));
};

module.exports.createQuestions = (req, res, next) => {
  const {
    testName, questions, titleQue, variants, titleVar,
  } = req.body;
  Questions.create({
    testName, questions, titleQue, variants, titleVar, idVar: req.user._id, idQue: req.user._id,
  }).then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некоректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};







module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Нельзя удалять чужие карточки!'));
      } else {
        Card.findByIdAndRemove(cardId)
          .then((cards) => {
            res.send(cards);
          });
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Переданы некоректные данные при удалении карточки.'));
      } else {
        next(err);
      }
    });
};



module.exports.updateCard = (req, res, next) => {
  const {
    name, link, titleRu, titleDeu,
  } = req.body;
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      name, link, titleRu, titleDeu,
    },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Карточка с указанным _id не найдена.');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Карточка с указанным _id не найдена.');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
      } else if (err.statusCode === 404) {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};