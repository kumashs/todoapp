"use strict";

const Config = require("./app-config.json");
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const cors = require('cors')
const app = express();
const path = require('node:path');

const configObject = Config.filter(object => object.projectId === 'todoApp');
const env = configObject[0].env;
const port = configObject[0].port;
// const env = "static"
// const port = 4565
console.log("env:" + env + "\nPort:" + port);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

const index = require("./app/routes/index");
index(app);

app.listen(port, function () {
    console.log("notification " + env + " api started on port: " + port);
});
