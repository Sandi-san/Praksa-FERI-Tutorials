//uporabi paket uuid (npm install uuid)
const uuid = require('uuid');

//dostop do objekta v paketu
// const { v4: uuidv4 } = require('uuid');
// console.log(uuidv4());
// import { v4 as uuidv4 } from 'uuid'; //react sintaksa (dodaj "type": "module" v package.json)

//uporabi paket express
const express = require('express');
const app = express(); //shrani express paket v spremenljivko
// za json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//uporabi paket mongoose (connection z mongodb)
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//povezi Models folder
const Customer = require('./models/customer');

//uporabi paket dotenv
//Node.js ni v production stanju, uporabi .env spremenljivke
if (process.env.NODE_ENV !== 'production') {
    //uporaba .env spremenljivk (environment vars) v projektu
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
//povezava baze
const CONNECTION = process.env.CONNECTION;

const customers = [
    {
        "name": "Marjan",
        "industry": "Music"
    },
    {
        "name": "Jon",
        "industry": "Networking"
    },
    {
        "name": "Sal",
        "industry": "Sports"
    }
]

const customer = new Customer({
    name: 'Marjan',
    industry: 'Example object'
});

//endpoint (povratna informacija ko user obisce port)
//browser po defaultu uporabi get
app.get('/', (req, res) => {
    res.send("Welcome to my site!");
});
//dobi customers collection iz DB (UPORABI async)
app.get('/api/customers', async (req, res) => {
    //vrne vse collections v console (tabele)
    // console.log(await mongoose.connection.db.listCollections().toArray());
    try {
        // res.send({"data with space":json["favorite People"]})
        const result = await Customer.find(); //najdi shremo
        res.json({ "customers": result }); //res.send ali res.json

    } catch (e) {
        res.status(500).json({ error: e.message }); //vrni code 500 in json error
    }
});

//shrani customer v DB
app.post('/api/customers', async (req, res) => {
    console.log(req.body);
    const customer = new Customer(req.body.customer);
    try {
        await customer.save();
        // req.status(201).json({customer}); //vrne atribute z objektom
        req.status(201).json(customer); //vrne le atribute brez imena objekta
    } catch (error) {
        res.status(400).json({ error: e.message });
    }
});

app.post('/', (req, res) => {
    res.send('This is a post request!');
});

//async uporaba mongoose
const start = async () => {
    try {
        await mongoose.connect(CONNECTION);
        //zacetna funkcija ob zagonu serverja (v console)
        app.listen(PORT, () => {
            console.log('App listening on port ' + PORT);
        });
    } catch (e) {
        console.log(e.message);
    }
};
//invoke function
start();