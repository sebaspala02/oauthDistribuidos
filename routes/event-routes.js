const router = require('express').Router();
const event = require('../models/event')

router.post('/create', function (req, res) {
    console.log(req.body)
    var body = req.body,
        name = body.name,
        place = body.place;
    localUser.findOne({ name: name }, function (err, doc) {
        if (err) {
            res.status(500).send('error ocurred');
        } else {
            if (doc) {
                res.status(500).send('Event already exists');
            } else {
                var record = new event();
                record.name = name;
                record.place = place;
                record.save(function (err, user) {
                    if (err) {
                        res.status(500).send('DB error');
                    } else {
                        res.send(user);
                    }
                });
            }
        }
    });
})

module.exports = router;