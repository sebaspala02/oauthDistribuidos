const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    city: {
        type: String
    },
    product: {
        type: String
    },
    price: {
        type: Number
    },
    event: {
        type: Number
    }
});

//Validation for email
// restaurantSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Email invalido');

module.exports = mongoose.model('restaurant', restaurantSchema, 'restaurant');