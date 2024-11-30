// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const routes = require('./routes');

// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());

// // Use centralized routes
// app.use('/api', routes);

// // Connect to MongoDB and start the server
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error(`Database connection error: ${error.message}`);
//         process.exit(1); // Exit the process if DB connection fails
//     }
// };

// // Call the connectDB function
// connectDB();

// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

// app.listen(3003, () => console.log('Server running on port 3003'));





const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes'); // Path to user routes
const routes = require('./routes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

app.use('/api', routes);

// Database connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    });

// Routes
// app.use('/api/users', userRoutes); // All user-related routes

// Error handler middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
