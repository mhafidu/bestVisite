const express = require('express')
const wrapAsync = require('../utils/wrapAsync')

// middleware
const { validatePlace } = require('../middleware/validationInput') 
const isValidateObjectId = require('../middleware/isvalidateObjectId')
const { isAuthorPlace } = require('../middleware/isAuthor')
const isAuth = require('../middleware/isAuth')
const upload = require('../configs/multer')

// controllers
const placeController = require('../controllers/place')

const router = express.Router();

router.route('/')
    .get(wrapAsync(placeController.showPlaces))
    .post(isAuth, upload.array('image', 5), validatePlace, wrapAsync(placeController.addPlace))

router.get('/create', isAuth, (req, res) => {
    res.render('places/create')
})

router.route('/:place_id')
    .get(isValidateObjectId('/places'), wrapAsync(placeController.showDetail))
    .put(isAuth, isAuthorPlace, isValidateObjectId('/places'), upload.array('image', 5), validatePlace, wrapAsync(placeController.editPlace))
    .delete(isAuth, isAuthorPlace, isValidateObjectId('/places'), wrapAsync(placeController.deletePlace))

router.get('/:place_id/edit', isAuth, isAuthorPlace, isValidateObjectId('/places'), wrapAsync(placeController.showEdit))

router.delete('/:place_id/images', wrapAsync(placeController.deleteImage))


module.exports = router