var books = require('../models/books');
exports.add = function(req, res, next) {
    res.render('bookedit', {
        title: "Add a book",
        docreate: true,
        bookid: "",
        book: undefined
    });
}

exports.save = function(req, res, next) {
    if (req.body.docreate === 'create') {
        books.create(req.body.bookid,
        			 req.body.name,
        			 req.body.image,
        			 req.body.content);
    } else {
        books.update(req.body.bookid,
        			 req.body.name,
        			 req.body.image,
        			 req.body.content);
    }
    res.redirect('/bookview?bookid='+req.body.bookid);
}

exports.view = function(req, res, next) {
    var book = undefined;
    if(req.query.bookid) {
        book = books.read(req.query.bookid);
    }
    res.render('bookview', {
        name: book ? book.name : "",
        bookid: req.query.bookid,
        book: book
    });
}

exports.edit = function(req, res, next) {
    var book = undefined;
    if(req.query.bookid) {
        book = books.read(req.query.bookid);
    }
    res.render('bookedit', {
        name: book ? ("Edit " + book.name) : "Add a Book",
        docreate: book ? false : true,
        bookid: req.query.bookid,
        book: book
    });
}

exports.destroy = function(req, res, next) {
    var book = undefined;
    if(req.query,bookid) {
        book = books.read(req.query.bookid);
    }
    res.render('bookdestroy', {
        name: book ? book.name : "",
        bookid: req.query.bookid,
        book: book
    });
}

exports.dodestroy = function(req, res, next) {
   books.destroy(req.body.bookid);
   res.redirect('/');
}