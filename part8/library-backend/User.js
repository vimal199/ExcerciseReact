const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    favouriteGenre: {
        type: String
    }
})
module.exports = mongoose.model('User_gql_exc', schema)
