const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/noderest');
mongoose.Promise = global.Promise;

module.exports = mongoose;