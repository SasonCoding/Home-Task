const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const UserRoutes = require("./api/routes/User")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

//DB connection.
mongoose.connect(process.env.DATA_BASE_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log("DB connected!!");
});

//Middleware for other servers to be able to communicate with this server after allowing the cors.
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8000', 'http://localhost:4200']
}));

//Routes
//This structure allows us to create different routes in other files and import them to this app.js file and operate them from here.
app.use('/user', UserRoutes);

//Handling unexpected routes/errors.
app.use((req, res, next) => { 
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {//If there was an error this will send the respond back to the user with the details of the error.
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            anotherMessage: "Something went wrong and the server couldn't preform your request..."
        }
    })
})

module.exports = app