// server.js file should be in charge of starting our server

const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

const fs = require('fs');
const path = require('path');

// route to express.js
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data
app.use(express.json());
  
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
});
  
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

app.post('/api/animals', (req, res) => {
    // set id based on what the next index of the array will be 
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
      resizeTo,staus(400).send('The animal is not properly formatted. ');
    } else {
      const animal = createNewAnimal(req.body, animals);
      res.json(animal); 
    }
});

// create routes to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// create route to take user to animals
app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

// create route to take user to zookeeper
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// starts port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});