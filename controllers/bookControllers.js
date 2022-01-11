const Book = require("../models/bookModel");
const AppError = require("../utilities/AppErrors");
const {catchAsync}=require("./errorController");
const APIFeatures = require("../utilities/APIFeatures")




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

const removeOne = catchAsync(async function(request,response) {
    const requestedBook= await Book.findOneAndDelete({isbn : request.params.isbn});
    if (!requestedBook) {
        return next(new AppError("no document found with that id", 404))
    };

    response.status(200).json({       
        status : "success",
        data : null
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
    console.log(request.query);
    const filtre=new APIFeatures(Book.find(request.filter), request.query)
        .filter()
        .sort()
        .projection()
        .paginate()
        .search()
        .minNumberOfRatings()
        .minRating();

    const books = await filtre.query;
    if (!books) {
        return response.status(404).json({
            status: "error",
            message : "Aucun livre ne corresponds à cette querry"
        })
    }

    response.status(200).json({
        status: "ok",
        length : books.length,
        books
    })

});


const topTag = catchAsync(async function(request, response, next){
    request.query.tags=request.params.tags;
    request.query.limit='100';
    request.query.page='1';
    next();
})

const bestTag = catchAsync(async function(request, response, next){
    request.query.tags=request.params.tags;
    request.query.limit='100';
    request.query.page='1';
    request.query.minNumberOfRatings="10000";
    request.query.sort="-rating";

    request.query.total
    next();
})
module.exports={
    getAll,
    addBook,
    getOne,
    removeOne,
    topTag,
    bestTag
}