var express = require('express');
var router = express.Router();
var request = require('request');
var goodGuy = require('good-guy-http')({maxRetries: 3});

console.log(process.env.NODE_DEBUG);

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('book!');
});

router.get('/:isbn', function (req, res, next) {
    var isbn = req.params.isbn;

    goodGuy('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn).then(function (response) {

        return JSON.parse(response.body);

    }).then(function (body) {
        var item = body.items[0].volumeInfo;

        res.render('book', {
            title: item.title,
            thumbnail: item.imageLinks.thumbnail,
            description: item.description
        });

    });
});

module.exports = router;
