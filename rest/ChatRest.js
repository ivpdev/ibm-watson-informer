var express = require('express')
var DialogService = require('../services/DialogService')

var router = express.Router();

router.post('/', function(req, res, next) {
	let message = req.body.message;
	let context = JSON.parse(req.body.context);

	DialogService
		.tell(message, context)
		.then(answer =>
		    res.send(answer) )});

module.exports = router;