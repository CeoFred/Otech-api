var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
	res.render("index", { title: "Fixbot" });
});

router.get("/event", function(req, res){
	res.ren
})
module.exports = router;
