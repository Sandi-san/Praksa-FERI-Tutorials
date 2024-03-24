// const mongoose = require('mongoose');

//import z es6 (potrebno pri .ts)
import {HydratedDocument, Schema, model} from 'mongoose';

//definiranje modelov v typescript (interface)
interface IOrder {
    description: string,
    amountInCents?: number //?-optional element
};
interface ICustomer {
    name: string,
    industry?: string,
    orders?: IOrder[]
};

//definiraj model (shemo, struktura)
// const customerSchema = new mongoose.Schema({
//uporaba z es6
const customerSchema = new Schema<ICustomer>({
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
export const Customer = model('Customer', customerSchema);


//uporaba interface-ov. POZOR: treba import HydratedDocument v tem file-u
// const c: HydratedDocument<ICustomer> = new Customer({
//     name:'test',
//     industry:'teest'
// });
// console.log(c);