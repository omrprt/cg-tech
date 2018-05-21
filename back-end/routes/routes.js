'use strict';
const fetch = require('node-fetch');
const path = require('path');

const appRouter = app => {

  app.get('/', function(req, res) {
    res.status(200).sendFile('index.html');
  });

  app.get('/users', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => res.status(200).send(data));
  });

  app.get('/albums', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => res.status(200).send(data));
  });

  app.get('/photos', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => res.status(200).send(data));
  });

};

module.exports = appRouter;
