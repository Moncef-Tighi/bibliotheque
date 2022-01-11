const express = require("express");
const {getAll, addBook, getOne} = require("../controllers/bookControllers");



const router= express.Router();

router.route("/books").get(getAll).post(addBook);
router.route("/books/{isbn}").get(getOne)


module.exports= router;