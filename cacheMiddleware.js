const NodeCache = require('node-cache');
const cache = new NodeCache();
const fetchData = require('./getTrafficData');

//checks to see if cacheData exists if not creates new cache
//currently deletes after 15 mins
function trafficCacheMiddleware(req, res, next) {
    const cachedData = cache.get('trafficApiData');
    if (cachedData) {
      // if cached data is available, send it to the view
      res.locals.trafficApiData = cachedData;
      next();
    } else {
      // if cached data is not available, fetch it and cache it
      fetchData.fetchData()
        .then((data) => {
          //deletes after 15 minutes (900 seconds)
          cache.set('trafficApiData', data, 900);
          res.locals.trafficApiData = data;
          console.log("fetched traffic API data successfuly")
          next();
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  }

  function bikeCacheMiddleware(req, res, next) {
    const cachedData = cache.get('bikeApiData');
    if (cachedData) {
      // if cached data is available, send it to the view
      res.locals.bikeApiData = cachedData;
      next();
    } else {
      // if cached data is not available, fetch it and cache it
      fetchData.fetchBikeData()
        .then((data) => {
          //deletes after 15 minutes (900 seconds)
          cache.set('bikeApiData', data, 900);
          res.locals.bikeApiData = data;
          console.log("fetched bike API data successfuly")
          next();
        })
        .catch((err) => {
          console.error(err);
          next(err);
        });
    }
  }

  module.exports = {trafficCacheMiddleware, bikeCacheMiddleware};