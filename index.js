const express= require("express");
const app = express();
const path = require("path");
const bookRouter = require("./router/bookRoute")
const {defaultError} = require("./controllers/errorController");

app.use(express.json({
    limit : "10kb" //Limite la taille du body à 10kb
}));

app.use(express.static(path.join(__dirname, 'public') ) )
app.use("/api/v1", bookRouter);

app.all( (request, response, next)=> {    
    const error = new AppError(`can't find the URL ${request.originalUrl} on this server`, 404);
    next(error);
})

app.use(defaultError);



module.exports= app;