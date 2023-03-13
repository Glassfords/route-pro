//imports
const express = require('express')
const path = require('path')
const app = express()
const router = require('./routes/baseRouter')
const expressHandlebars = require('express-handlebars')
const axios = require('axios')
const fs = require('fs')

const public = path.join(__dirname, "./public")

//handlebars engine
app.engine('handlebars', expressHandlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//public folder
app.use(express.static(public))
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'node_modules')));



//redirect to routes
app.use(router)

// Set the interval to write trafficData to file (currently 15 mins)
setInterval(writeToFile, 900000);
const filePath = path.join(public, 'data.json');
function writeToFile() {
  // Make the API call
  axios.get('https://api.glasgow.gov.uk/traffic/v1/movement/now')
    .then(response => {
      // Write the response data to a file
      fs.writeFile(filePath, JSON.stringify(response.data), (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
    })
    .catch(error => {
      console.error(error);
    });
}

//server - port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})





