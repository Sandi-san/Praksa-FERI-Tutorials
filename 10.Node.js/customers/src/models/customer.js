"use strict";
// const mongoose = require('mongoose');
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
//import z es6 (potrebno pri .ts)
const mongoose_1 = require("mongoose");
;
;
//definiraj model (shemo, struktura)
// const customerSchema = new mongoose.Schema({
//uporaba z es6
const customerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    industry: String,
    orders: [
        {
            description: String,
            amountInCents: Number
        }
    ]
});
//ustvari collection v mongoDB
// module.exports = mongoose.model('Customer', customerSchema);
//uporaba z es6
exports.Customer = (0, mongoose_1.model)('Customer', customerSchema);
//uporaba interface-ov. POZOR: treba import HydratedDocument v tem file-u
// const c: HydratedDocument<ICustomer> = new Customer({
//     name:'test',
//     industry:'teest'
// });
// console.log(c);
