const ErrorHandler = require('../utils/ErrorHandler')
// schema
const { placeSchema } = require('../schemas/place')
const { reviewSchema } = require('../schemas/review');

module.exports.validatePlace = (req, res, next) => {
    const { error } = placeSchema.validate(req.body)
    if (error) {
        const mssg = error.details.map(el => el.message).join(',')
        return next(new ErrorHandler(mssg, 400))
    } else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    console.log(req.body)
    if (error) {
        const mssg = error.details.map(el => el.message).join(',')
        return next(new ErrorHandler(mssg, 400))
    } else {
        next()
    }
}