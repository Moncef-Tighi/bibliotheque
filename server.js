const {app} = require("./index.js");
const dotenv= require('dotenv')
dotenv.config({path:__dirname+'/config.env'});


const port = process.env.PORT || 2000
app.listen(port, ()=> {
    console.log(`Server open on port ${port}`);
});
