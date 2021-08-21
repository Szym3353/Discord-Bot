const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new mongoose.Schema({
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
    collection: 'role'
})

const Role = mongoose.model('role', RoleSchema)
module.exports = Role