var mongoose = require("mongoose"); 
mongoose.connect("mongodb://localhost/mongoAssociationsZoo"); 

module.exports.Animal = require("./animal"); 
module.exports.Zoo = require("./zoo");