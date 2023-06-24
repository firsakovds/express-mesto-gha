
const router = require('express').Router();
const {getCards, createCards, deleteCards, likeCard, dislikeCard } = require('../controllers/cards');
router.get('/cards', getCards);
router.post('/cards', createCards);
router.delete('/cards/:cardId', deleteCards);

router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard)


module.exports = router;
//PUT /cards/:cardId/likes — поставить лайк карточке
//DELETE /cards/:cardId/likes — убрать лайк с карточки