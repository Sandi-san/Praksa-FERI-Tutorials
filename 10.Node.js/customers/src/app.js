//uporabi paket uuid (npm install uuid)
const uuid = require('uuid');

//dostop do objekta v paketu
// const { v4: uuidv4 } = require('uuid');
// console.log(uuidv4());
// import { v4 as uuidv4 } from 'uuid'; //react sintaksa (dodaj "type": "module" v package.json)

const express = require('express');
const app = express(); //shrani express paket v spremenljivko
const PORT = 3000;

const customers = [
    {
        "name":"Marjan",
        "industry":"Music"
    },
    {
        "name":"Jon",
        "industry":"Networking"
    },
    {
        "name":"Sal",
        "industry":"Sports"
    }
]

//endpoint (povratna informacija ko user obisce port)
//browser po defaultu uporabi get
app.get('/', (req,res) => {
    res.send("Welcome to site!")
});
app.get('/api/customers', (req,res) => {
    // res.send({"data with space":json["favorite People"]})
    res.send({"customers":customers})
});

app.post('/api/customers', (req,res) => {
    console.log(req.body);  
    res.send(req.body);  
});

app.post('/',(req,res) => {
    res.send('This is a post request!');
});

//zacetna funkcija ob zagonu serverja (v console)
app.listen(PORT, () => {
    console.log('App listening on port '+PORT);
});
