import jwt from 'jsonwebtoken';
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token geçerlilik süresi
    });
};

export default generateToken;