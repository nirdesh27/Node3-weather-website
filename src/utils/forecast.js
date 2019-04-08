const request = require('request');

const forecast = (long, lang, callback) => {
  const url =
    'https://api.darksky.net/forecast/6925fe3689fca0224819af36e813b89b/' +
    long +
    ',' +
    lang +
    '?units=si';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('connection error ', undefined);
    } else if (body.error) {
      callback(undefined, body.error);
    } else {
      const data = body.currently;
      // console.log(data);
      callback(undefined, {
        temperature: data.temperature,
        rain: data.cloudCover,
      });
    }
  });
};

module.exports = forecast;
