//imports
const express = require('express')
const path = require('path')
const app = express()
const router = require('./routes/baseRouter')
const expressHandlebars = require('express-handlebars')
const axios = require('axios')
const cacheMiddleware = require('./cacheMiddleware');

const public = path.join(__dirname, "./public")

//handlebars engine
app.engine('hbs', expressHandlebars.engine({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

//public folder
app.use(express.static(public))
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'node_modules')));

//middleware for traffic data (cacheMiddleware.js)
app.use(cacheMiddleware);

//redirect to routes
app.use(router)


//server - port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})





