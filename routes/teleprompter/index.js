var express = require("express");
var router = express.Router();

// ===============================
// Teleprompter
// ===============================
router.get("/teleprompter", function (req, res) {
    res.render("teleprompter/index");
})


module.exports = router;