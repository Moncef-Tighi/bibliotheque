const slugify= require("slugify");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    isbn : {
        type : String,
        default : "00000000"
    },
    author : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required: true,
        unique : true
    },
    desc : {
        type : String,
        default : "Ce livre n'a aucune description."
    },
    genre : String,
    bookformat : String,
    link: String,
    img : {
        type : String,
        default : "default.jpg"
    },
    rating : {
        type : Number,
        default : 1
    },
    pages : Number,
    totalratings : {
        type : Number,
        default : 0
    },
    slug : String

},{

    toJSON : {virtuals : true},
    toObject : {virtuals : true} 

});

bookSchema.index({genre : 1})
bookSchema.index({author : 1})

//bookSchema.index({tour : 1, user : 1}, {unique : true});

bookSchema.pre("save",function(next){
    this.slug=  slugify(this.title, {lower: true});
    next();
});

// reviewSchema.statics.calculateAverageRatings = async function(tourId){
//     const stats= await this.aggregate([
//         {
//             $match: {tourId}
//         },
//         {
//             $group: {
//                 _id: "$tour",
//                 nRatings : {$sum : 1},
//                 avgRating : {$avg : "$rating"}
//             }
//         }
//     ])
// }
// reviewSchema.pre("save", function(next){
    
//     this.constructor.calculateAverageRatings(this.reviewedTour);
//     next();
// })


const Book = mongoose.model("book", bookSchema);




module.exports=Book;