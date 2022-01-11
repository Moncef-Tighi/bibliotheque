const Book = require("../models/bookModel.js");
const AppError = require("../utilities/AppErrors.js");
const {catchAsync}=require("./errorController");

const getOne = function(request,response) {

}
const addBook = function(request,response) {
    console.log(request);
    response.status(200).json({
        status : "ok"
    })   
}
const getAll = function(request,response) {
    
}
modudle.exports={
    getAll,
    addBook,
    getOne
}