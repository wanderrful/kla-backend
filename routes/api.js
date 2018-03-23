const express = require("express");
const router = express.Router();

const db = require("../queries");



router.get("/", (req, res, next) => {
    res.status(200);
    res.render("Hello world!");
});

router.get("/api/words", db.getAllWords);



module.exports = router;