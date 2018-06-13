var express = require("express");
var router = express.Router();

var passport = require("passport");
var User = require("../../models/themoviereview/user");
var Movie = require("../../models/themoviereview/movie");



// ===============================
// Landing Page
// ===============================
router.get("/tmr", function (req, res) {
    
    Movie.find({}, function (err, newlyAddedMovie) {
        if(err) {
            console.log("Error")
        } else {
            
            res.render("themoviereview/landing", {newUser: req.user, newlyAddedMovie: newlyAddedMovie});
        }
    })
    
    
})

// ===============================
// Register New User Form
// ===============================
router.get("/tmr/register", function(req, res) {
    res.render("themoviereview/register");
})


// ===============================
// Register User Logic
// ===============================
router.post("/tmr/register", function (req, res) {
    
   var newUser = new User({username: req.body.username});
   
    User.register(newUser, req.body.password, function (err, createdUser) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/tmr/register");
        } 
        passport.authenticate("local")(req, res, function () {
            console.log("Got here");
            req.flash("success", "Registration successfull, you're now logged in!");
            res.redirect("/tmr");
        });
    });
    
});


// ===============================
// Login Form
// ===============================
router.get("/tmr/login", function(req, res) {
    res.render("themoviereview/login");
})

// ===============================
// User Login Logic
// ===============================
router.post('/tmr/login',
  passport.authenticate('local', { successRedirect: '/tmr',
                                   failureRedirect: '/tmr/login',
                                   failureFlash: 'Invalid username or password',
                                   successFlash: 'Login Successful'
                                     })
);

// ===============================
// User Logout Logic
// ===============================
router.get('/tmr/logout', function(req, res) {
    console.log(req.user);
    var name = req.user.username;
      req.logout();
      req.flash("success", "You have been successfully logged out " + name + "!");
      res.redirect("/tmr");
  });
  
  
module.exports = router;