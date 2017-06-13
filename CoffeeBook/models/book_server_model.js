var mysql = require('mysql');

var con = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "1234",  
database: "coffeebook"  
});

module.exports.conn = con;

module.exports.insertBooks = function(){
  con.connect(function(err) {  
   if (err) throw err;   
  var sql = "INSERT INTO books (bookkey, image, title, content, createdAt, updatedAt) VALUES (13, 'DD','AA', 'content1dds', 0,0)";  
  con.query(sql, function (err, result) {  
  if (err) throw err;  
    console.log("1 record inserted");  
  });  
});
};