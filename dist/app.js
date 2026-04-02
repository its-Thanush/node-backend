"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const error_1 = __importDefault(require("./middleware/error"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
app.use('/users', users_1.default);
app.use(error_1.default);
exports.default = app;
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
