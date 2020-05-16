const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const localUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

localUserSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

localUserSchema.methods.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model('localUser', localUserSchema, 'localUser');