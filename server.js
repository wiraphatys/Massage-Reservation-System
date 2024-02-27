// express
const express = require('express');
const app = express();
app.use(express.json())     // body-parser

// env
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });

// port & mode
const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV;

// cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser)

// connectDB
const connectDB = require('./config/db');
connectDB();
// router


// listening
const server = app.listen(PORT, () => {
    console.log(`This server running in ${MODE} mode on a port ${PORT}`)
})

// handle error
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    })
})