const express = require('express')
const router = express.Router()
const controller = require('../controllers/baseController')

router.get('/', controller.landing_page)

router.get('/map', controller.map)

router.get('/about', controller.about)

//handle file not found
router.use(function(req, res) {
    res.status(404)
    res.type('text/plain')
    res.send('404 Not found.')
})
//handle errors
    router.use(function(err, req, res, next) {
    res.status(500)
    res.type('text/plain')
    res.send(err)
})

module.exports = router