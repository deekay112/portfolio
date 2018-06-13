var         express                     = require("express"),
            bodyParser                  = require("body-parser"),
            mongoose                    = require("mongoose"),
            passport                    = require("passport"),
            cookieParser                = require("cookie-parser"),
            LocalStrategy               = require("passport-local"),
            session                     = require("express-session"),
            passportLocalMongoose       = require("passport-local-mongoose"),
            methodOverride              = require("method-override"),
            flash                       = require("connect-flash"),
            request                     = require("request"),
            moment                      = require("moment"),
                    // Requiring Models
            User                        = require("./models/themoviereview/user"),
            Movie                       = require("./models/themoviereview/movie"),
            Comment                     = require("./models/themoviereview/comment"),
                    // Requiring Routes
            homeRoute                   = require("./routes/home/index"), 
            teleprompterRoute           = require("./routes/teleprompter/index"),
            colorgameRoute              = require("./routes/colorgame/index"),
            authRoute                   = require("./routes/themoviereview/auth"),
            movieRoute                  = require("./routes/themoviereview/movie"),
            commentRoute                = require("./routes/themoviereview/comment")

var app = express();
app.use(express.static(__dirname + '/public'));



// mongoose.connect('mongodb://localhost/theMovieReview');
mongoose.connect('mongodb://doyin:mongodb@ds233970.mlab.com:33970/themoviereview');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(cookieParser('secret'));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
      res.locals.newUser = req.user;
      res.locals.error = req.flash("error");
      res.locals.success = req.flash("success");
    next();
});

app.use(homeRoute);
app.use(colorgameRoute);
app.use(teleprompterRoute);
app.use(authRoute);
app.use(commentRoute);
app.use(movieRoute);

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Portfolio server started");
})