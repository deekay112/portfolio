var express = require("express");
var router = express.Router();

// ===============================
// Color Game
// ===============================
router.get("/colorgame", function (req, res) {
    res.render("colorgame/index");
})


module.exports = router;