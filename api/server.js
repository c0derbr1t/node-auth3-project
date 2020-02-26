const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const restricted = require('../middleware/restricted-middleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', authRouter);
server.use('/api/users', restricted, usersRouter);

server.get('/', (req, res) => {
    res.json({ message: 'Welcome to the User Management System!' });
});

module.exports = server;