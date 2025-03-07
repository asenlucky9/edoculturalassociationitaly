// src/backend/routes/memberRoutes.js
const express = require('express');
const router = express.Router();

// Define your routes here

// Example route
router.get('/', (req, res) => {
    res.send('Member routes');
});

module.exports = router;
