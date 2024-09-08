const express = require('express')
const wrapAsync = require('../utils/wrapAsync')
// middleware
const isAuth = require('../middleware/isAuth')
const { isAuthorReview } = require('../middleware/isAuthor')
const { validateReview } = require('../middleware/validationInput')

// schemas
const { model } = require('mongoose');

// controller
const reviewController = require('../controllers/review')

const router = express.Router({ mergeParams: true });


router.post('/', isAuth, validateReview, wrapAsync(reviewController.addReview))
router.delete('/:review_id', isAuth, isAuthorReview,wrapAsync(reviewController.deleteReview))

module.exports = router