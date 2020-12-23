const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const User = require('../models/user.model');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({ login: req.body.login });
    console.log('login', candidate)
    if ( candidate ) {
        const isPasswordValid = bcrypt.compareSync(req.body.password, candidate.password);
        if ( isPasswordValid ) {
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, keys.JWT, { expiresIn: 60 * 60 });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Password not correct' })
        }
    } else {
        res.status(404).json({ message: 'User not found' })
    }
}

module.exports.createUser = (req, res) => {
    
}