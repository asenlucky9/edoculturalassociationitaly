const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const memberRoutes = require('./routes/memberRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

// Use routes
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Export the app
module.exports = app;
