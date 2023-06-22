const mongoose = require("mongoose")
const validator = require('validator');

const contactSchema = new mongoose.Schema({
    fname : {
        type:String,
        required : true
    },
    lname:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    
    ServicemanId:{
        type:String,
        required:true,
        trim:true,
        
    },
    
    Complaint:{
        type:String,
        required:true,
        trim:true,
    },

   
    

    
})
const contact  = new mongoose.model("Regcomplaint " ,contactSchema )
module.exports = contact