const express= require("express");
const app = express();
const path = require("path");
const bookRouter = require("./router/bookRoute")
const {defaultError} = require("./controllers/errorController");
const AppError= require("./utilities/AppErrors");
app.use(express.json({
    limit : "10kb" //Limite la taille du body à 10kb
}));

app.use(express.static(path.join(__dirname, 'public') ) )
app.use("/api/v1", bookRouter);
app.use( (request, response, next)=> {    

    if (!request.originalUrl.includes("/api")) {
        return response.sendFile(path.join(__dirname, "./public/404.html"));
    }
    const error = new AppError(`can't find the URL ${request.originalUrl} on this server`, 404);
    next(error);
})

app.all(defaultError);



module.exports= app;