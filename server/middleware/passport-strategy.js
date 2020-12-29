const { Strategy, ExtractJwt } = require('passport-jwt');
const { model } = require('mongoose');
const keys = require('../keys');
const User = model('users');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = new Strategy(options, async (payload, done) => {
    try {
        const candidate = await User.findById(payload.userId).select('id');
        if ( candidate ) {
            done(null, candidate);
        } else {
            done(null, false);
        }
    } catch (err) {
        console.log(err);
    }
});