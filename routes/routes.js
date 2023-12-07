const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/views/index.html'));
});

router.use('/gyms', require('./gyms'));
module.exports = router;