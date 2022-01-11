const app = require("./index");
const dotenv= require('dotenv');
const mongoose = require("mongoose");
dotenv.config({path:__dirname+'/config.env'});

const db= process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSEWORD)
mongoose.connect(db, {
    useNewUrlParser : true
}).then(()=> console.log("Connected successfully to the DataBase"));


const port = process.env.PORT || 2000
app.listen(port, ()=> {
    console.log(`Server open on port ${port}`);
});
