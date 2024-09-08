const Place = require('../models/place')
const fs = require('fs')
const ExpressError = require('../utils/ErrorHandler')
const { geometry } = require('../utils/hereMaps')


module.exports.showPlaces = async (req, res) => {
    const places = await Place.find()
    const clusterPlaces = places.map(place => {
        return {
            lat: place.geometry.coordinates[1],
            lng: place.geometry.coordinates[0]
        }
    })
    const cluster = JSON.stringify(clusterPlaces)
    res.render('places', { places, cluster });
}

module.exports.addPlace = async (req, res, next) => {
    const images = req.files.map( file => ({
        url: file.path,
        filename: file.filename
    }))

    const geoData = await geometry(req.body.place.location)
    const place = new Place(req.body.place)

    place.author = req.user._id
    place.images = images
    place.geometry = geoData
    
    await place.save()
    req.flash('success_msg', 'place added successfully')
    res.redirect('/places')
}

module.exports.showDetail = async (req, res) => {
    const place = await Place.findById(req.params.place_id)
    .populate({
        path: 'reviews',
        populate: 'author',
    })
    .populate('author')
    res.render('places/show', { place })
}

module.exports.showEdit = async (req, res) => {
    const place = await Place.findById(req.params.place_id)
    res.render('places/edit', { place })
}

module.exports.editPlace = async (req, res) => {
    const { place } = req.body
    const geodata = await geometry(place.location)
    const newPlace = await Place.findByIdAndUpdate(place.place_id, { ...place, geometry: geodata })

    if(req.files && req.files.length > 0){

        place.images.forEach(image => {
            fs.unlink(image.url, err => new ExpressError(err))
        });

        const images = req.files.map(file => ({
            url: file.path,
            filename: file.filename
        }))

        newPlace.images = images
        await newPlace.save()
    }
    req.flash('success_msg', 'place edit successfully')
    res.redirect(`/places/${req.params.place_id}`)
}

module.exports.deletePlace = async (req, res) => {
    const { place_id } = req.params
    const place = await Place.findById(place_id)

    if (place.images.length > 0){
        place.images.forEach(image => {
            fs.unlink(image.url, err => new ExpressError(err))
        });
    }
    await Place.findByIdAndDelete(place_id)
    req.flash('success_msg', 'place detele successfully')
    res.redirect('/places')
}

module.exports.deleteImage = async (req, res) => {
    try {
        const { place_id } = req.params
        const { images } = req.body
        
        const place = await Place.findById(place_id)
        if(!place){
            req.flash('error_msg', 'Place not found')
            return res.redirect(`/places/${place_id}/edit`)
        }
        
        if(!images || images.length === 0){
            req.flash('error_msg', 'Please select at least one image')
            return res.redirect(`/places/${place_id}/edit`)
        }
        
        images.forEach(image => {
            fs.unlinkSync(image)
        })
        
        await Place.findByIdAndUpdate(
            place_id,
            { $pull: { images: { url: { $in: images } } } },
            { new: true }
        );
        
        req.flash('success_msg','successfully deleted images')
        return res.redirect(`/places/${place_id}/edit`)
    } catch (err) {
        console.error(err)
        req.flash('error_msg','failed to delete images')
        return res.redirect(`/places/${place_id}/edit`)
    }
}