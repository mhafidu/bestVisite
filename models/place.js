const mongoose = require('mongoose')
const Review = require('./review')
const { ref } = require('joi')
const Schema = mongoose.Schema

const placeSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    geometry:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images:[
        {
            url: String,
            filename: String,
        }
    ],
    author:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }],
})

placeSchema.post('findOneAndDelete', async function(doc){
    if (doc){
        await Review.deleteMany({_id:{$in: doc.reviews}})
    }
})

module.exports = mongoose.model('place', placeSchema)