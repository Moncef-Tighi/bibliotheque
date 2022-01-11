const Book = require("../models/bookModel");
const AppError = require("../utilities/AppErrors");
const {catchAsync}=require("./errorController");

const getOne = catchAsync(async function(request,response) {
    const requestedBook= await Book.findOne({isbn : request.params.isbn});
    if (!requestedBook) {
        return response.status(404).json({
            status: "error",
            message : "L'ISBN fournit n'est pas répertorité dans cette bibliothèque"
        })
    }
    response.status(200).json({
        status: "ok",
        requestedBook
    })

});

const addBook = catchAsync(async function(request,response) {
    const newBook= await Book.create(request.body);
    response.status(200).json({
        status : "ok",
        newBook
    })   
})
const getAll =  catchAsync(async function(request,response) {
    const allBooks= await Book.find();
    response.status(200).json({
        status: "ok",
        length : allBooks.length,
        allBooks
    })

});
module.exports={
    getAll,
    addBook,
    getOne
}