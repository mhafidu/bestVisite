const mongoose = require('mongoose');
const Place = require('../models/place');
const hereMaps = require('../utils/hereMaps')

mongoose.connect('mongodb://127.0.0.1/bestpoint')
    .then((result) => {
        console.log('connected to mongodb')
    }).catch((err) => {
        console.log(err)
    });

async function seedPlaces() {
    const places = [
        {
            title: 'Taman Mini Indonesia Indah',
            price: 20000,
            description: 'Taman hiburan keluarga dengan berbagai replika bangunan dari seluruh Indonesia',
            location: 'Taman Mini Indonesia Indah, Jakarta',
            image: 'https://source.unsplash.com/collection/2349781/1280x720'
        },
        {
            title: 'Pantai Kuta',
            price: 0,
            description: 'Pantai yang terkenal di Bali dengan pemandangan sunset yang indah',
            location: 'Pantai Kuta, Kuta, Badung Regency, Bali',
            image: 'https://source.unsplash.com/collection/2349781/1280x720'
        },
    ]

    try {
        const newPlaces = await Promise.all(places.map(async (place) => {
            let geoData = await hereMaps.geometry(place.location);
            if (!geoData) {
                geoData = { type: 'Point', coordinates: [116.32883, -8.90952] }
            }
            return {
                ...place,
                author: '66b9e1571696f4d4ceead7cb',
                images: {
                    url: 'public\\images\\image-1724596075236-395032690.png',
                    filename: 'image-1724596075236-395032690.png'
                },
                geometry: { ...geoData }
            }
        }))
        await Place.deleteMany({});
        await Place.insertMany(newPlaces);
        console.log('Data berhasil disimpan');
    } catch (err) {
        console.log('Terjadi kesalahan saat menyimpan data:', err);
    } finally {
        mongoose.disconnect();
    }
}

seedPlaces();