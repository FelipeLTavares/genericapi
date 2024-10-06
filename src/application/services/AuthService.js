const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');
const UserDto = require('../dtos/user/UserDto');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async function ({ name, email, password }) {
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const userDto = new UserDto(user);

        return userDto;
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.authenticate = async function ({ email, password }) {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const userDto = new UserDto(user);

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h'
        });

        return { user: userDto, token };
    } catch (error) {
        throw new Error(error.message);
    }
}
