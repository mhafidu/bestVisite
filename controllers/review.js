// models
const Review = require('../models/review')
const Place = require('../models/place')

module.exports.addReview = async (req, res) => {
    const {place_id} = req.params

    const review = new Review(req.body.review)
    review.author = req.user._id
    await review.save()

    const place = await Place.findById(place_id)
    place.reviews.push(review)
    
    await place.save()
    res.redirect(`/places/${place_id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { place_id, review_id } = req.params
    await Place.findByIdAndUpdate(place_id, { $pull: { reviews: { _id: review_id } } })
    await Review.findByIdAndDelete(review_id)
    res.redirect(`/places/${place_id}`)
}