const fetch = require('cross-fetch');
const express = require('express');
const cors = require('cors');
const dataStore = require('nedb');
const app = express();
require('dotenv').config();
const port = process.env.port || 3000;

console.log(process.env);

app.use(cors({origin: '*'}));

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new dataStore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});


app.get('/api', (request, response) => {
    database.find({}, (error, data) => {
        if(error){
            response.end();
            return;
        }
        response.json(data);
    });
    
})

app.get('/weather/:cityapp', async (request, response) => {
//     const city_name = "London";
// const app_id = "960e483ee545f7d120460cbbb1283524";
console.log(request.params);
const cityapi = request.params['cityapp'].split(',');
console.log(cityapi);
const city = cityapi[0];
const api = process.env.API_KEY;

const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

const fetch_response = await fetch(api_url);
const json = await fetch_response.json();
response.json(json);
});


app.listen(port, () => console.log(`Listening at port ${port}`));