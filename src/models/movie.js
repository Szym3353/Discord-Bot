const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    authorAvatar: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    time: {
        type: String,
        required: false,
    },
    year: {
        type: String,
        required: false,
    },
    score: {
        type: Array,
        default: undefined,
    }
},
{
    collection: 'moviesList'
})

const Movie = mongoose.model('moviesList', MovieSchema)
module.exports = Movie