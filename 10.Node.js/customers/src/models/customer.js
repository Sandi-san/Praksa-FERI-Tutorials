const mongoose = require('mongoose');

//definiraj model (shemo, struktura)
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: String
});

//ustvari collection v mongoDB
module.exports = mongoose.model('Customer',customerSchema);