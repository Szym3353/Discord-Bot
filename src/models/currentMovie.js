const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CurrentMovieSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    authorAvatar: {
        type: String,
        required: true,
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
    collection: 'currentMovie'
})

const CurrentMovie = mongoose.model('currentMovie', CurrentMovieSchema)
module.exports = CurrentMovie