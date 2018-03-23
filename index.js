const express = require("express");
const pg = require("pg");

const api = require("routes/api");

require("dotenv").config();

const app = new express();
const db = pg.Client({
    connectionString: process.env.DB_URL
});




COLUMNS = [
    "query",
    "answer"
];



app.set("port", (process.env.PORT || 3000));



app.post("/api/words/create", (req, res) => {
    /*  Adds a new word to the database.
     *  
     *  Syntax: 
     *  /api/words/create?q=WORD&a=ANSWER
     */
    const { q, a } = req.query;


    if (!q || !a) {
        res.json({
            error: "Missing required param \'q\' or \'a\'"
        });
        return;
    }

    db.query(`
        INSERT INTO ${process.env.DB_TABLE_NAME} 
        VALUES (${q}, ${a})
    `, r => {
        res.json([]);
        return;
    });
});

app.get("/api/words", (req, res) => {
    /*  Syntax: 
     *  /api/words
     */

    db.query(`
        SELECT *
        FROM ${process.env.DB_TABLE_NAME}
    `, r => {
        res.json([]);
        return;
    });
});



app.listen(app.get("port"), () => {
    console.log(`Example app listening on port ${app.get("port")}`);
});