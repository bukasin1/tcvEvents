const mongoose = require("mongoose")
const Schema = mongoose.Schema

const eventSchema = new Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
        },
        category: {
            type: String
        },
        date: {
            type: Date
        },
        isVirtual: Boolean,
        address: {
            type: String
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('event', eventSchema)