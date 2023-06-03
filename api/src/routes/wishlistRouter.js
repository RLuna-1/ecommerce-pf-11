const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

router.post('/', wishlistController.addToWishlist);
router.delete('/:userId/:productId', wishlistController.removeFromWishlist);
router.get('/:userId', wishlistController.getWishlist);

module.exports = router;