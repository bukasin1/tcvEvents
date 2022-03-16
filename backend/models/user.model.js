const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        admin: {
            type: Boolean
        },
        interests: {
            type: String
        }
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('user', userSchema)