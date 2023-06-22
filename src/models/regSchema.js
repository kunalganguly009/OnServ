const res = require("express/lib/response");
const { string } = require("handlebars-helpers/lib");
const async = require("hbs/lib/async");
const mongoose = require("mongoose")
var Schema = mongoose.Schema;
const validator = require('validator');

const empSchema = new mongoose.Schema({
    fname : {
        type:String,
       required : true,
       
    },
    lname:{
        type:String,
       required : true
    },
    
    likes:{
        type: Number,
        default: 0
    },
    
    PhoneNumber:{
        type:Number,
       required:true,
        unique:true,
    
            max:9999999999,

            trim:true,
    },
    City:{
        type:String,
       required:true
        

    },
    Area:{
        type:String,
       required:true
    },
    AreaPin:{
        type:Number,
       required:true,
        trim:true,
        // min:999999,
        max:999999
    },
   
    WashingMachine:{type:String},
    AirConditioner:{type:String},
    Refrigerator:{type:String},
    InductionStove:{type:String},
    VacuumCleaner:{type:String},
    Camera:{type:String},
    MicrowaveOven:{type:String},
    WaterPurifier:{type:String},
    Television:{type:String},
    MixerGrinder:{type:String},
    Generator:{type:String},
    CeilingFan:{type:String},
    WaterHeater:{type:String},
    Dryer:{type:String},
})
 
const Reg  = new mongoose.model("RegUsers" ,empSchema )
module.exports = Reg


    
