const NodeCache = require('node-cache');
const cache = new NodeCache();
const fetchData = require('./getTrafficData');

//checks to see if cacheData exists if not creates new cache
//currently deletes after 15 mins
function cacheMiddleware(req, res, next) {
    const cachedData = cache.get('apiData');
    if (cachedData) {
      // if cached data is available, send it to the view
      res.locals.apiData = cachedData;
      next();
    } else {
      // if cached data is not available, fetch it and cache it
      fetchData()
        .then((data) => {
          //deletes after 15 minutes (900 seconds)
          cache.set('apiData', data, 900);
          res.locals.apiData = data;
          console.log("fetched API data successfuly")
          next();
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  }

  module.exports = cacheMiddleware;