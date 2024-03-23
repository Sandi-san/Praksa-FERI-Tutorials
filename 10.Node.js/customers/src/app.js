//uporabi paket uuid (npm install uuid)
// const uuid = require('uuid');
//dostop do objekta v paketu
// const { v4: uuidv4 } = require('uuid');
// console.log(uuidv4());
// import { v4 as uuidv4 } from 'uuid'; //react sintaksa (dodaj "type": "module" v package.json)

//uporabi paket express
const express = require('express');
//uporabi paket mongoose (connection z mongodb)
const mongoose = require('mongoose');
//POVEZI MODELS
//povezi customer models folder
const Customer = require('./models/customer');
//uporabi paket cors
const cors = require('cors');

const app = express(); //shrani express paket v spremenljivko
mongoose.set('strictQuery', false);

app.use(cors());
//Za parsat json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//uporabi paket dotenv
//Node.js ni v production stanju, uporabi .env spremenljivke
if (process.env.NODE_ENV !== 'production') {
    //uporaba .env spremenljivk (environment vars) v projektu
    require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
//povezava baze
const CONNECTION = process.env.CONNECTION;

const newCustomer = new Customer({
    name: 'Marjan',
    industry: 'Default customer'
});

//endpoint (povratna informacija ko user obisce port)
//browser po defaultu uporabi get
//INDEX.HTML
app.get('/', (req, res) => {
    res.send("Welcome to my site!");
});

app.post('/', (req, res) => {
    // res.send('This is a post request!');
    res.send(newCustomer);
});

//DOBI VSE CUSTOMERJE
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

//DOBI EN CUSTOMER (ID)
app.get('/api/customers/:id', async (req, res) => {
    //requestParams = customers/id_val
    //requestQuery = customers?id=id_val (deluje tudi pri: customers/id_val?nov_param=...)
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });
    try {
        const customerId = req.params.id;
        console.log(customerId);
        const customer = await Customer.findById(customerId);
        console.log(customer);
        if (!customer) {
            res.status(404).json({ error: 'Item not found' })
        }
        else {
            res.json({ customer });
        }
    } catch (e) {
        res.status(500).json({ error: 'Error: Bad syntax' })
    }
});

//SAVE CUSTOMER
app.post('/api/customers', async (req, res) => {
    //POZOR: req.body MORE BITI V OBLIKI JSON
    //sicer poslje name {name,industry} sintakso
    console.log(req.body);
    const customer = new Customer(req.body);
    try {
        console.log(customer);
        await customer.save();
        // req.status(201).json({customer}); //vrne atribute z objektom
        res.status(201).json(customer); //vrne le atribute brez imena objekta
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


//UPDATE CUSTOMER (PUT (vse) ali PATCH (le spremenjene el.))
app.put('/api/customers/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        //posodobi enega glede _id in poslji novi data
        const result = await Customer.replaceOne({ _id: customerId }, req.body);
        console.log(result);
        res.json({ updatedCount: result.modifiedCount });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
});

//DELETE CUSTOMER
app.delete('/api/customers/:id', async (req,res)=>{
    try {
        const customerId = req.params.id;
        const result = await Customer.deleteOne({_id:customerId});
        res.json({deletedCount: result.deletedCount});
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })        
    }
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