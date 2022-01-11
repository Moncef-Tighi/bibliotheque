const express = require("express");
const { route } = require("express/lib/application");
const {getAll, addBook, getOne,removeOne,topTag,bestTag} = require("../controllers/bookControllers");



const router= express.Router();

router.route("/books").get(getAll).post(addBook);
router.route("/books/:isbn").get(getOne).delete(removeOne);
router.route("/books/top-100/:tags").get(topTag, getAll);
router.route("/books/best-100/:tags").get(bestTag, getAll);

module.exports= router;