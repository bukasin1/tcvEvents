var express = require('express');
var router = express.Router();
const EventsController = require("../controllers/eventController");
const Auth = require('../middlewares/auth');


router.get('/discoverEvents', Auth.authenticateToken, EventsController.discoverEvents);
router.post('/admin/add-event', Auth.authenticateToken, EventsController.addEvent);

module.exports = router;