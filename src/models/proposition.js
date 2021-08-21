const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropSchema = new mongoose.Schema({
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
    accepted: {
        type: Boolean,
        required: true,
    },
    deny: {
        type: Boolean,
        required: true,
    },
    waiting: {
        type: Boolean,
        required: true,
    },
},
{
    collection: 'proposition'
})

const Proposition = mongoose.model('proposition', PropSchema)
module.exports = Proposition