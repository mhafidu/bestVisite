const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    rating: Number,
    body: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
})

module.exports = mongoose.model('review', reviewSchema)