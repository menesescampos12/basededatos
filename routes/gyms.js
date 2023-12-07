const gymController = require('../controllers/gymsController');
// const passport = require("passport");

const router = require('express').Router();

router.get('/', function(req, res) {
    gymController.getgyms(req, res);
});

router.get('/:id', function(req, res) {
    gymController.searchgyms(req, res);
});

router.post('/search-by-email/:email', function(req, res) {
    gymController.SearchgymsByEmail(req, res);
})

router.post('/', function(req, res) {
    gymController.creategyms(req, res);
});

router.delete('/:id', function(req, res) {
    gymController.removegyms(req, res);
});

router.put('/:id', function(req, res) {
    gymController.updategyms(req, res);
});


module.exports = router;