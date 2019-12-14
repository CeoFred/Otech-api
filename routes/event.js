var express = require("express");
const eventRequestController = require("../controllers/events");

var router = express.Router();

router.get("/", eventRequestController.getAllevetns);
router.get("/upcoming", eventRequestController.upcomingEvents);
router.get("/past", eventRequestController.pastevents);
router.get('/:id', eventRequestController.getSingleRequest);


module.exports = router;