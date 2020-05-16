const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const event = new Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('event', event, 'event');