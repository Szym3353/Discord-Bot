const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roleId: {
        type: String,
        required: true,
    },
    emoji: {
        type: String,
        required: true
    }
},
{
    collection: 'gry'
})

const Gry = mongoose.model('gry', GrySchema)
module.exports = Gry