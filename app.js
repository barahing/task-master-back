const users = require ('./routes/users')
const tasks = require ('./routes/tasks')
const bodyParser = require('body-parser');
const express = require('express');
const cors = require ('cors');

app = express();

require('dotenv').config;
require('./db');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use(cors());
app.use('/users', users);
app.use('/tasks', tasks);


app.listen(3500, ()=> {
    console.log("App ejecutándose en el puerto " + 3500);
});
