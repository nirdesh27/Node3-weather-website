const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoibmlyZGVzaCIsImEiOiJjanR2aW9wYW4wZzExM3pwbDFlY2g0d2t1In0.qy7hrVQjoKb0pcU82G1OhA&limit=1';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('some conncectivity isssue', undefined);
    } else if (body.features.length === 0) {
      callback('unable to find try another search', undefined);
    } else {
      const data = body.features[0].geometry.coordinates;
      callback(undefined, {
        latitude: data[0],
        longitude: data[1],
        place: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
