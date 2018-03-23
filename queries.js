const promise = require("bluebird");
const pgp = require("pg-promise")({
    promiseLib: promise,
    error: (error, e) => {
        if (e.cn) {
            console.log("CN: ", e.cn);
            console.log("EVENT: ", error.message || error);
        }
    }
});
const db = pgp(process.env.DB_URL);

// Test that the db connection works
db.connect()
    .then(obj => obj.done())
    .catch(error => console.log(error.message || error));



function getAllWords(req, res, next) {
    db.any(`select * from ${process.env.DB_URL}`)
        .then(data => {
            res.status(200);
            res.json({
                status: "success",
                data: data,
                message: "Retrieved ALL words"
            })
        })
        .catch(err => next(err));
}



module.exports = {
    getAllWords:   getAllWords
};