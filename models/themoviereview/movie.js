var mongoose = require("mongoose");

// ===============================
// Movie Schema
// ===============================
var movieSchema = new mongoose.Schema({
    moviename : String,
    description: String,
    image: String,
    year: String,
    rated: String,
    released: String,
    runtime: String,
    genre: String,
    director: String,
    country: String,
    writer: String,
    actors: String,
    language: String,
    type: String,
    dvd: String,
    production: String,
    author: {
            id:     {   type: mongoose.Schema.Types.ObjectId,
                        ref: "User" },
            username: String         
    },
    comments: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Comment"
            }
        ]
})

module.exports = mongoose.model("Movie", movieSchema);