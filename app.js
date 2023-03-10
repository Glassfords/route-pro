//imports
const express = require('express')
const path = require('path')
const app = express()
const router = require('./routes/baseRouter')
const expressHandlebars = require('express-handlebars')

//handlebars engine
app.engine('handlebars', expressHandlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//public folder
app.use(express.static(path.join(__dirname, "./public")))
app.use(express.urlencoded({extended: false}))


//bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))

//redirect to routes
app.use(router)

//server - port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})





