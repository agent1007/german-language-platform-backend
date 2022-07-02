const Resultats = require('../models/resultats');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getResultats = (req, res, next) => {
  Resultats.find({}).then((resultats) => res.send(resultats))
    .catch((err) => next(err));
};


module.exports.createResultats = (req, res, next) => {
  const {
    nameTest, nameUser, resultat,
  } = req.body;
  Resultats.create({
    nameTest, nameUser, resultat, owner: req.user._id,
  }).then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некоректные данные при записи результата.'));
      } else {
        next(err);
      }
    });
};

