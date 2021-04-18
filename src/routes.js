const express = require('express');
const UrlShortner = require('./controllers/UrlShortner');
const routes = express.Router();

routes.post('/shorturl', UrlShortner.ShortNewUrl);
routes.get('/shorturl/:url', UrlShortner.GoToShortedUrl);

module.exports = routes;
