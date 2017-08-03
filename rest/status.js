var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
    res.send('OK!') })


router.get('/debug', function(req, res, next) {
    res.send(JSON.stringify(process.env.VCAP_SERVICES, null, 4))
})

module.exports = router;