var express = require('express');
var router = express.Router();
var request = require('request');
var goodGuy = require('good-guy-http')({maxRetries: 3});
var jsonpath = require('jsonpath');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('book!');
});

router.get('/:isbn', function (req, res, next) {
    var isbn = req.params.isbn;

    goodGuy('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn).then(function (response) {

        return JSON.parse(response.body);

    }).then(function (body) {
        
        res.render('book', {
            title: jsonpath.query(body, '$..volumeInfo.title'),
            thumbnail: jsonpath.query(body, '$..volumeInfo..thumbnail'),
            description: jsonpath.query(body, '$..volumeInfo.description')
        });

    });
});

module.exports = router;
