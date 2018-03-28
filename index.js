const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

require("dotenv").config();

const api = require("./routes/api");

const app = new express();



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.set("port", (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", api);

/*
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/


app.listen(app.get("port"), () => {
    console.log(`Example app listening on port ${app.get("port")}`);
});