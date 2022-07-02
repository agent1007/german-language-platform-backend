const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

const {
  getResultats, createResultats,
} = require('../controllers/resultats');

// const {
//   validateGetCards, validateCreateCard, validateDeleteCard, validateUpdateCard,
// } = require('../middlewares/validatons');

router.get('/', getResultats);

router.post('/', createResultats);

// router.patch('/:cardId', validateUpdateCard, updateCard);

// router.delete('/:cardId', validateDeleteCard, deleteCard);

// router.put('/likes/:cardId', validateDeleteCard, likeCard);

// router.delete('/likes/:cardId', validateDeleteCard, dislikeCard);

router.use((req, res, next) => {
  next(new NotFoundError('Ресурс по указанному маршруту не найден.'));
});

module.exports = router;