// src/backend/routes/eventRoutes.js
const express = require('express');
const router = express.Router();

// Example event route
router.get('/', (req, res) => {
    res.send('Events route');
});

module.exports = router;
