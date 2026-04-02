import 'dotenv/config';
import express, { Application } from 'express';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import errorHandler from './middleware/error';

const app: Application = express();

app.use(express.json());
app.use('/auth',  authRouter);
app.use('/users', usersRouter);
app.use(errorHandler);

export default app;





// require('dotenv').config();
// const express      = require('express');
// const errorHandler = require('./middleware/error');
// const app = express();
// const userRoutes = require('./users');



// // middleware
// app.use(express.json());

// // logger (optional)
// app.use((req, res, next) => {
//   console.log(`👉 ${req.method} ${req.url}`);
//   next();
// });

// // test routes (optional)
// app.get('/hello', (req, res) => {
//   res.json({
//     message: "Hello from your server",
//     timestamp: new Date().toISOString()
//   });
// });

// app.use('/auth',  require('./routes/auth'));
// app.use('/users', userRoutes);
// app.use(errorHandler);

// module.exports = app;