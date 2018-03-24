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
    // Syntax: /api/words
    db.any(`
        SELECT * 
        FROM ${process.env.DB_TABLE_NAME}
    `)
        .then(data => {
            res.status(200);
            res.json({
                status: "success",
                data: data,
                message: "Retrieved ALL words"
            });
        })
        .catch(err => next(err));
}

function getWord(req, res, next) {
    // Syntax: /api/words/:id
    const {id} = req.body;
    db.any(`
        SELECT * 
        FROM ${process.env.DB_TABLE_NAME}
        WHERE id=${id}
    `)
        .then(data => {
            res.status(200);
            res.json({
                status: "success",
                data: data,
                message: "Retrieved ALL words"
            });
        })
        .catch(err => next(err));
}

function createWord(req, res, next) {
    // Syntax: /api/words?kr=wordhere&en=wordhere
    const {kr, en} = req.body;

    db.none(`
        INSERT INTO ${process.env.DB_TABLE_NAME} (word_kr, word_en)
        VALUES (\'${kr}\', \'${en}\')
    `)
        .then( () => {
            res.status(200);
            res.json({
                status:"success",
                message: "Inserted new word"
            });
        })
        .catch(err => next(err));
}

function deleteWord(req, res, next) {
    // Syntax: /api/words/delete?kr=wordhere
    const {kr} = req.body;

    db.none(`
        DELETE FROM ${process.env.DB_TABLE_NAME}
        WHERE word_kr=\'${kr}\'
    `)
        .then( () => {
            res.status(200);
            res.json({
                status:"success",
                message: "Deleted word"
            });
        })
        .catch(err => next(err));
}



module.exports = {
    getAllWords: getAllWords,
    getWord: getWord,
    createWord: createWord,
    deleteWord: deleteWord
};