const axios = require('axios')

//fetches traffic data
function fetchData() {
    // Make the API call
    
    return axios.get('https://api.glasgow.gov.uk/traffic/v1/movement/now')
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw new Error('Failed to fetch data from API');
    });
}


module.exports = fetchData;