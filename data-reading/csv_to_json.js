const csvFilePath='./GoodReads_100k_books.csv'
const csv=require('csvtojson')
 
const readStream=require('fs').createReadStream(csvFilePath);
 
const writeStream=request.put('http://mysite.com/obj.json');
 
readStream.pipe(csv()).pipe(writeStream);
