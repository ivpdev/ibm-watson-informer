const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    res.send('OK!')
})

router.get('/debug', function(req, res, next) {
    //var debugOutput = JSON.stringify(process.env.VCAP_SERVICES, null, 4)
    var debugOutput = 'DEBUG'

    res.send(debugOutput)
})

module.exports = router;