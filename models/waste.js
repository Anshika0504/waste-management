const mongoose=require('mongoose');
const wasteSchema=new mongoose.Schema({
    Date:{
        type:Date,
        require:true,
    },
    Name:{
        type:String,
        require:true
    },
    Type:{
      type:String,
      require:true
    },
    Desc:{
        type:String,
        require:true
    },
    Comp:{
        type:String,
        require:true
    }

})
module.exports=mongoose.model("waste",wasteSchema);