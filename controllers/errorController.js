const AppError = require("../utilities/AppErrors");

const handleCastErrorDB = function(error){
    const message = `Invalid ${error.path} : ${error.value}`;
    return new AppError(message, 400); 
};

const handleDuplicateFieldsDB = function(error){

    //const value = error.errmsg.match(/("')(\\?.)*?\1/)[0];
    //Cette ligne était nécessaire dans les vieilles versions de Mongoose.
    const message = `La valeur : ${Object.values(error.keyValue)[0]} est dupliquée. Veuillez utiliser une autre valeur.`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = function(error){

    const errors= Object.values(error.errors).map(element=> element.message);
    const message = `Invalid input data : ${errors.join(" , ")}`;
    return new AppError(message, 400);
};

const sendErrorDev = function(error, request, response){
    if (request.originalUrl.startsWith("/api")){
        if (error.isOperational){
            return response.status(error.statusCode).json({
                status : error.status,
                error : error,
                message : error.message,
                stack : error.stack
            })
        //programming ou erreure inconnue  
        } else {
            return response.status(500).json({
                status : "error",
                message : "Something went wrong"
            })
        }
    } 
    return response.status(error.statusCode).render("error",{
        message : error.message
    })
    
}


const defaultError = function(error, request, response, next) {

    error.statusCode= error.statusCode || 500;
    error.status = error.status || "error";

        sendErrorDev(error, request, response);    
    next();
}

const catchAsync= function(func){
    return (request, response, next) => {
        func(request, response, next).catch(error => next(error));
    }
}

module.exports = {
    defaultError,
    catchAsync
}