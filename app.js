const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const PoolCluster = require('mysql/lib/PoolCluster');
const { connect } = require('http2');
const Connection = require('mysql/lib/Connection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Parsing middleware
// Parse application/ x-www-fprm-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//Parse application/json
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Template engine
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

const routes = require('./server/routes/user')
app.use('/', routes);

app.listen(port, () => {console.log(`Listening on port http://localhost:${port}`)});