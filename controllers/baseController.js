//static json
var data = require('../public/trafficData.json')

//homepage
exports.landing_page = function(req, res) {
    res.render('index')
}

//map page
exports.map = function(req, res) {
    
    //add description, lat, lng, flow to array
    var refinedData = new Array
    data.forEach(item => {
        refinedData.push([{description: item.site.from.description}, {lat: item.site.from.lat},{lng: item.site.from.long}, {flow: item.flow}])
    })

    res.render('map', {layout: false, trafficData: refinedData})
}



