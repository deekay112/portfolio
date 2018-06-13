var express = require("express")
var router = express.Router();
var moment = require("moment");

var Movie = require("../../models/themoviereview/movie");
var Comment = require("../../models/themoviereview/comment");



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
// Show Movie Image and Comments
// ===============================
router.get("/tmr/movies/:imageId", isLoggedIn,  function(req, res) {
    var imageId = req.params.imageId;
    
    Movie.findById(imageId, function (err, foundImage) {
        if(err) {
            console.log("error finding image")
        }
        else {
            
            Comment.find({ '_id' : { $in : foundImage.comments } }, function (err, returnComments) {
                if(err) {
                    console.log("Error findng the comments")
                }
                else{
                    
                    res.render("themoviereview/movies/show", {foundImage:foundImage, returnComments:returnComments, moment:moment});
                }
            })
            
        }
    } )
})


// ===============================
// Adding Comments to Movie
// ===============================
router.post("/tmr/movies/:imageId", isLoggedIn, function (req, res) {
    var imageId = req.params.imageId;
    var newComment = new Comment({text: req.body.comment, author:{id:req.user._id, username: req.user.username}});
    
    Movie.findById(imageId, function(err, foundImage) {
        
        if(err) {
            console.log(err)
        }
        else{
            
            newComment.save(function (err, newlySavedComment) {
                 if(err) {
                  console.log("Error saving comment")
                  }
                 else{
                    foundImage.comments.push(newlySavedComment._id)
                    foundImage.save();
                    console.log("Updated foundImage");
                    console.log(foundImage);
                    req.flash("success", "Your comment was successfully added!");
                    res.redirect("/tmr/movies/" + foundImage._id);
                 }
        
            })
        }
    })
})

// ===============================
// Update Movie Comment
// ===============================
router.put("/tmr/movies/:movieUrl/comment/:commentUrl", function(req, res) {
 
    
    Comment.findByIdAndUpdate(req.params.commentUrl, {text: req.body.commentUpdate},  function (err, updatedComment) {
        console.log(req.params.commentUrl)
        console.log(req.body.commentUpdate)
        if(err) {
            console.log("Error updating Comment");
        }
        else {
            console.log("Comment successfully updated with " +  updatedComment);
            req.flash("success", "Your comment has been updated!");
            res.redirect("/tmr/movies/" + req.params.movieUrl);
        }
    })
})

// ===============================
// Delete Movie Comment
// ===============================
router.delete("/tmr/movies/:movieUrl/comment/:commentUrl", function (req, res) {
    Comment.findByIdAndRemove(req.params.commentUrl, function (err) {
        if(err) {
            console.log("Error removing comment");
        }
        else {
            req.flash("success", "Your comment has been removed!");
            res.redirect("/tmr/movies/" + req.params.movieUrl);
        }
    })
})

module.exports = router;