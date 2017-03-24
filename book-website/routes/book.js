var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('book!');
});

router.get('/:isbn', function(req, res, next) {
    var isbn = req.params.isbn;
    
    
    request('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      
        var body = JSON.parse(response.body);
        var items = body.items;
        var item = body.items[0].volumeInfo;
        
        var tplVars = {
          title: item.title,
          thumbnail: item.imageLinks.thumbnail,
          description: item.description,
        };
        
        res.render('book', tplVars);
        
        //res.send('book number '+ isbn + ', '+thumb )

    });    
});

module.exports = router;
