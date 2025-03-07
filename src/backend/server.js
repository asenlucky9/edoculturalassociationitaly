const app = require('./app');
const connectDB = require('./config/db'); // Import the database connection
const PORT = process.env.PORT || 5000;

// Function to start the server
const startServer = async () => {
    try {
        await connectDB(); // Ensure the database connection is established
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process with failure
    }
};

// Start the server
startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1); // Exit the process with failure
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1); // Exit the process with failure
});
