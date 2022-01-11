const Book = require("../models/bookModel");
const AppError = require("../utilities/AppErrors");
const {catchAsync}=require("./errorController");

const getOne = function(request,response) {

}
const addBook = function(request,response) {
    console.log(request.body);
    response.status(200).json({
        status : "ok"
    })   
}
const getAll = function(request,response) {
    
}
module.exports={
    getAll,
    addBook,
    getOne
}