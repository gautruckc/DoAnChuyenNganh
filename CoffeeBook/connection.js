var Sequelize = require('sequelize');

var sequlz;

module.exports.connect = function(params, callback) {
     sequlz = new Sequelize(
        params.dbname, 
        params.username, 
        params.password,
        params.params
    );
    callback(null, sequlz);
};
