var Book = undefined;
module.exports.connect = funtion(params, callback){
    var sequlz = new Sequelize(
        params.dbname, 
        params.username, 
        params.password,
        params.params
    );
    Book = sequlz.define('Book', {
        bookid: {
            type: Sequelize.STRING,
            primaryKey: true,
            unique: true
        },
        name: Sequelize.STRING,
        image: Sequelize.TEXT,
        content: Sequelize.TEXT
    });
    Book.sync().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
exports.disconnect = function(callback) {
    callback();
}
 
exports.create = function(bookid, name, image, content, callback) {
    Book.create({
            bookid: bookid,
            name: name,
            image: image,
            content: content
        }).then(function(book) {
            callback();
        }).error(function(err) {
            callback(err);
    });
}
exports.update = function(bookid, name, image, content, callback) {
    Book.find({ where:{ bookid: bookid} }).then(function(book) {
        if(!book) {
            callback(new Error("No book found for id " + bookid));
        } else {
            book.updateAttributes({
                name: name,
            	image: image,
            	content: content
            }).then(function() { 
                callback();
            }).error(function(err) {
                callback(err);
            });
        }
    }).error(function(err) {
        callback(err);
    });
}

exports.read = function(bookid, callback) {
    Book.find({ where:{ bookid: bookid} }).then(function(book) {
        if(!book) {
            callback("Nothing found for " + bookid);
        } else {
            callback(null, {
                bookid: book.bookid,
                name: book.name,
                image: book.image,
                content: book.content
            });
        }
    });
}
 
exports.destroy = function(bookid, callback) {
    Book.find({ where:{ bookid: bookid} }).then(function(book) {
        book.destroy().then(function() {
        callback();
    }).error(function(err) {
        callback(err);
    });
    });
}
 
exports.titles = function(callback) { 
    Book.findAll().then(function(books) { 
        var bookList = []; 
        books.forEach(function(book) { 
            bookList.push({
            	bookid: book.bookid,
                name: book.name
            }); 
        });
        callback(null, bookList);
    });
}