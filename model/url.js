const mongoose=require("mongoose");

const urlschema=new mongoose.Schema({
    shorturl:{
        type:String,
        unique:true,
        require:true,
    },
    redirecturl:{
        type:String,
        require:true,
        
    },
    vistedhistory:[{timestamp:{type:Number}}],
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }



},{timestamps:true})

const url=mongoose.model("url",urlschema);

module.exports=url;