//now here I'm going to create schema of the project
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Book = new Schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
    description:{
        type:String
    }
},
{
    collection:'amit'

})
//dont forget to export module.

module.exports = mongoose.model('Book',Book)