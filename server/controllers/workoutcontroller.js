const Express = require("express");
const router = Express.Router();
const { Workout } = require('../models');
const validateSession = require('../middleware/validate-session');

router.get('/practice', (req, res) => {
    res.send('This is a practice route')
});

module.exports = router;