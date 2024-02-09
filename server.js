const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const fs = require('fs/promises');

const jsonFilePath = 'json/weather-data.json';
const appid = '66ee8028f68dfce6f42f1552564adc11';
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
const {weather} = require('./models/Weather');

mongoose.connect("mongodb+srv://Gun:004823zx@flood.6dgc2cv.mongodb.net/?retryWrites=true&w=majority");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const api = require('./router/api.js');
app.use('/api', api);

const page = require('./router/page.js');
app.use('/', page);


app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
