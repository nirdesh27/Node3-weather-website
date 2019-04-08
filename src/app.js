const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');
const hbs = require('hbs');
const app = express();

//Define path of Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const view_path = path.join(__dirname, '../templates/views');
const partial_path = path.join(__dirname, '../templates/partials');

//Setup handlebars engines and views locations
app.set('view engine', 'hbs');
app.set('views', view_path);
hbs.registerPartials(partial_path);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'weather App new',
    author: 'Nirdesh kumar',
    name: 'name ROOT',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    about: 'This is about route',
    info: 'there nothing to tell',
    title: 'weather app',
    name: 'name ABOUT',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Develper help',
    para:
      'A paragraph (from the Ancient Greek παράγραφος paragraphos, "to write beside" or "written beside") is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences.',
    author: 'Nirdesh',
    name: 'name HELP',
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'address of location is required',
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        place,
        address: req.query.address,
      });
    });
  });
});
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'please provide a query sting',
    });
  }
  console.log(req.query);
  res.send({
    product: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Nirdesh Kumar',
    errorMessage: 'Help article are not found',
  });
});

// This should be in the end
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Nirdesh Kumar',
    errorMessage: 'page not found error',
  });
});

app.listen(3000, () => {
  console.log('server is up and running on port 3000');
});
