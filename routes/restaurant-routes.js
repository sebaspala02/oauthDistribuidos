const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const Restaurant = mongoose.model('restaurant');
const Restaurant = require('../models/restaurant');

router.get('/restaurant', (req, res, next) => {
    res.render('CRUD_restaurante.ejs');
});

router.post('/restaurant', (req, res, next) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }

});

function insertRecord(req, res) {
    var restaurant = new Restaurant();
    restaurant.nickname = req.body.nickname;
    restaurant.password = req.body.password;
    restaurant.name = req.body.name;
    restaurant.addres = req.body.address;
    restaurant.phone = req.body.phone;
    restaurant.city = req.body.city;
    restaurant.prodcut = req.body.prodcut;
    restaurant.price = req.body.price;
    restaurant.event = req.body.event;
    console.log(restaurant);

    restaurant.save((err, doc) => {
        if (!err) {
            res.redirect('/restaurant');
        } else {
            if (err.name == 'validationError') {
                handleValidationError(err, req.body);
                req.render('/restaurant', {
                    restaurant: req.body
                });
            } else {
                console.log('Error during record inserction: ' + err);
            }
        }
    });
}

function updateRecord(req, res) {
    Restaurant.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/restaurant');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('restaurant', {
                    restaurant: req.body
                });
            } else {
                console.log('Error during update: ' + err);
            }
        }
    });
}

router.get('list', (req, res) => {
    Restaurant.find((err, doc) => {
        if (!err) {
            res.render('/list', {
                list: docs
            });
        } else {
            console.log('Error list restaurant: ' + err);
        }
    });

});

function handleValidationError(err, body) {
    for (field in err.error) {
        switch (err.errors[field].path) {
            case 'nickname':
                body['nicknameError'] = err.errors[field].message;
                break;
            case 'password':
                body['passwordError'] = err.errors[field].message;
                break;
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'address':
                body['addressError'] = err.errors[field].message;
                break;
            case 'phone':
                body['phoneError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            case 'product':
                body['productError'] = err.errors[field].message;
                break;
            case 'price':
                body['priceError'] = err.errors[field].message;
                break;
            case 'event':
                body['eventError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/delete/:id', (req, res) => {
    Restaurant.findOneAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/restaurant/list');
        } else {
            console.log('Error on delete: ' + err);
        }
    });
});

module.exports = router;