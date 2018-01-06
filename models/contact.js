const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: String,
    tel: String
});

module.exports = mongoose.model('Contact', ContactSchema );