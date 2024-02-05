const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'));
//require('./model/userSchema');

const PORT = process.env.PORT;

// const middleware = (req, res, next) => {
//      console.log(`Hello Middleware`);
//      next();
// }

// app.get('/', (req, res) => {
//      res.send(`Hello World from the server`);
// });

// app.get('/about', middleware, (req, res) => {
//      res.send(`Hello About World from the server`);
// });

app.get('/contact', (req, res) => {
     res.send(`Hello Contact World from the server`);
});

app.get('/signin', (req, res) => {
     res.send(`Hello Signin World from the server`);
});

app.get('/register', (req, res) => {
     res.send(`Hello Signup World from the server`);
});

app.listen(PORT, () => {
     console.log(`Server is listening on port ${PORT}!`);
});
