//homepage
exports.landing_page = function(req, res) {
    res.render('index', {title: 'Home'})
}

//map page
exports.map = function(req, res) {
    
    const apiData = res.locals.apiData
    //render page with traffic data
    res.render('map', {layout: false, trafficData: apiData, title: 'Map'})
}

//statistics page
exports.stats = function(req, res) {

    const apiData = res.locals.apiData
    //render page with traffic data
    res.render('stats', {layout: false, trafficData: apiData, title: 'Statistics'})
}

//about page
exports.about = function(req, res) {
    res.render('about', {title: 'About Us'})
}



