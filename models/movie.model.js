const mongoose = require('mongoose')

const MovieSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter movie name"],
        },
        summary: {
            type: String,
            required: true
        },
        img: {
            type: String, required: false
        }
    },
    {
        timestamps: true,
    }
);

const movie = mongoose.model("Movie", MovieSchema);
module.exports = movie;
