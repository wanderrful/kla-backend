const express = require("express");
const router = express.Router();

const db = require("../queries");



router.get("/", (req, res, next) => {
    res.status(200);
    res.render("index");
});

router.get("/api/words", db.getAllWords);
router.get("/api/words/:id", db.getAllWords);
router.post("/api/words", db.createWord);
router.delete("/api/words/delete", db.deleteWord);



module.exports = router;