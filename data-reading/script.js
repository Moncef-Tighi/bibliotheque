const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Book= require("../models/bookModel");
dotenv.config({path:__dirname+'/config.env'});
const JSONStream = require('JSONStream');


  

// fs.createReadStream(__dirname+"/test.json")
//     .pipe(JSONStream.parse())
//     .on('data', async function(chunk){
//         while(chunk!== null ) {
//             //console.log(chunk);
//             importData(chunk)
//             //On sleep pour éviter de surcharger la DB
//         }
    
//     })
//     .on('end', function(){
//         console.log("Fini");
//         process.exit();
//     })

//Envoyé les données dans la DsB

const reading= async function(){
    const books = await JSON.parse(fs.readFileSync(`./data.json`, "utf-8"));
    return books
}

const importData= async (books)=> {
    try {
        const db= process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSEWORD);
        mongoose.connect(db, {useNewUrlParser : true})
        .then(()=>console.log("Connected successfully to the DataBase"));
        await Book.create(books);
            console.log("Data successefully loaded");
            process.exit();
    
    } catch(error) {
        console.log(error);
    }
}
reading().then(data=>importData(data))
