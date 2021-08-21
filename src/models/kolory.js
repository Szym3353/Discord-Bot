const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KolorySchema = new mongoose.Schema({
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
    collection: 'kolory'
})

const Kolory = mongoose.model('kolory', KolorySchema)
module.exports = Kolory