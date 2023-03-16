//static json
var data = require('../public/trafficData.json')

//homepage
exports.landing_page = function(req, res) {
    res.render('index', {title: 'Home'})
}

//map page
exports.map = function(req, res) {
    //render page with traffic data
    res.render('map', {layout: false, trafficData: data, title: 'Map'})
}

//about page
exports.about = function(req, res) {
    res.render('about', {title: 'About Us'})
}



