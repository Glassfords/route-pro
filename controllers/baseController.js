//static json
var data = require('../public/trafficData.json')

//homepage
exports.landing_page = function(req, res) {
    res.render('index')
}

//map page
exports.map = function(req, res) {
    
    //add description, lat, lng, flow to array
    res.render('map', {layout: false, trafficData: data})
}



