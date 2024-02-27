// Require package
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const {xss} = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");

// Import file
const connectDB = require("./config/db");

// Load ENV
dotenv.config({ path: "./config/config.env" });

// Define variable
const PORT = process.env.PORT || 3000;
const MODE = process.env.MODE;
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,    // 10 minute
    max: 100
})

// Connect database
connectDB();

// Use
app.use(express.json());        // body-parser
app.use(cookieParser);          // cookie-parser
app.use(mongoSanitize());       // express-mongo-sanitize
app.use(helmet());              // helmet
app.use(xss());                 // express-xss-sanitizer
app.use(limiter);               // express-rate-limit
app.use(hpp());                 // hpp
app.use(cors());                // cors

// Route

// listening
const server = app.listen(PORT, () => {
    console.log(`This server running in ${MODE} mode on a port ${PORT}`)
});

// handle error
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    })
});