const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');
const ws = require('ws');
const cors = require('cors');
const dotenv = require("dotenv");

const GYMS = require('./routes/gyms')
const routes = require('./routes/routes')
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)
app.use(GYMS)
app.listen(port, () => {
    console.log("App corriendo en el puerto " + port)
});


require('./db/db')