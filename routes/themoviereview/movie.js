var express = require("express");
var router = express.Router();
var request = require("request");

var Movie = require("../../models/themoviereview/movie");

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    else {
        req.flash("error", "Sorry, you must be logged in to perform the operation!");
        res.redirect("/tmr/login");
    }
} 

// ===============================
// Form to search new movie
// ===============================
router.get("/tmr/new", isLoggedIn, function (req, res) {

    res.render("themoviereview/movies/new")
})



// ===============================
// Display Movie Search Results
// ===============================
router.get("/tmr/movies", function (req, res) {
    
    var userInput = req.query.moviename;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + userInput;
    
    request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                
                var parsedData = JSON.parse(body);
                var movieData = parsedData["Search"];
                
                if (movieData == undefined) {
                    req.flash("error", "Your search for " + userInput + " yieled 0 results!");
                    res.redirect("/tmr/movies/new")
                }
                
                else if (userInput == undefined) {
                    res.redirect("/tmr")
                }
                
                else {
                    res.render("themoviereview/movies/result", {movieData:movieData, userInput:userInput});
                }
                
            }
        })
    
})






// ===============================
// Add new Movie Logic
// ===============================
router.get("/tmr/movies/new/:imdbid", isLoggedIn,  function (req, res) {
    
    var userInput = req.params.imdbid;
    var url = "http://www.omdbapi.com/?apikey=thewdb&i=" + userInput;
    
    request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                
                var parsedData = JSON.parse(body);
                console.log(parsedData);
                if(parsedData.Poster != 'N/A') {
                    var imageLink = parsedData.Poster;
                }
                else {
                    var imageLink = 'https://dummyimage.com/260x280&text=Image+Is+Unavailable';
                }
                
                console.log(imageLink);
                
                var newMovie = new Movie({moviename:parsedData.Title, image:imageLink, description:parsedData.Plot, year: parsedData.Year,rated: parsedData.Rated,released: parsedData.Released, country:parsedData.Country, runtime: parsedData.Runtime,genre: parsedData.Genre,director: parsedData.Director,writer: parsedData.Writer,actors: parsedData.Actors,language: parsedData.Language,type: parsedData.Type,dvd: parsedData.DVD,production: parsedData.Production,
                                        author:{ id: req.user._id, username: req.user.username }
                                        });
    
                 newMovie.save(function (err, newlyAddedMovie) {
                if (err) {
                    console.log("Error")
                } else {
                    console.log(newlyAddedMovie)
                    req.flash("success", "The Movie was successfully added!");
                    res.redirect("/tmr");
                }
                 })
                
            }
        })
    
})



// ===============================
// Delete Movie Image
// ===============================
router.delete("/tmr/movies/:movieUrl", function (req, res) {
    Movie.findByIdAndRemove(req.params.movieUrl, function (err) {
        if(err) {
            console.log("Error removing comment");
        }
        else {
            req.flash("success", "The movie was successfully removed!");
            res.redirect("/tmr");
        }
    })
})


module.exports = router;