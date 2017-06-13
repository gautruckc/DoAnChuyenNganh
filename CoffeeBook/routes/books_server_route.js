var express = require('express');
var router = express.Router();

var books = require('../models/book_server_model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('books_client_view', { title: 'Express' });
});

books.insertBooks();

module.exports = router;

