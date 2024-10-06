const express = require('express');
const CreateUserDto = require('../dtos/user/CreateUserDto');
const { register, authenticate } = require('../services/AuthService');

const Authrouter = express.Router();

Authrouter.post('/register', async (req, res) => {
    const userData = new CreateUserDto(req.body);
    const response = await register(userData)
    return res.status(201).json({ response })
})

Authrouter.post('/login', async (req, res) => {
    const loginData = new CreateUserDto(req.body);
    const response = await authenticate(loginData);
    return res.status(200).json({ response })
})

module.exports = Authrouter;