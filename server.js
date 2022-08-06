// server.js file should be in charge of starting our server

const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

const fs = require('fs');
const path = require('path');

// route to express.js
app.use(express.static('public'));

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// starts port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});