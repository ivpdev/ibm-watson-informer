var express = require('express');
var WatsonConversation = require('../services/WatsonConversationService');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	let message = req.body.message;
	
    WatsonConversation.sendMessage(message).then((response) => res.send(response))
});

module.exports = router;