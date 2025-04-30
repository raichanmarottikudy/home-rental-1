const mongoose = require('mongoose')

const porpertySchema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    rent:{
        type:String,
        required:true
    },
    propertytype:{
        type:String,
        required:true
    },
    totalarea:{
        type:String,
        required:true
    },
    bedrooms:{
        type:String,
        required:true
    },
    bathrooms:{
        type:String,
        required:true
    },
    additionalinfo:{
        type:String,
        required:true
    },
    propertyImg:[{
        type:String,
        required:true
    }],
    userid:{
        type:String,
        required:true
    }
},{timestamps:true})

const properties = mongoose.model("properties",porpertySchema)

module.exports = properties

