const express=require('express');
const mongoose=require('mongoose');
require("./config/db");
const cors=require('cors');
const dotenv=require('dotenv');
const Waste=require('./models/waste');
const app=express();
app.use(express.json());
app.use(cors());
app.post("/create",async (req,resp)=>{
    try{
        const wasteData=new Waste(req.body);
        if(!wasteData){
            return resp.status(404).json({msg:"user data no found"});
        }
        const saveData=await wasteData.save();
        resp.status(200).json(saveData);
        console.log("data created")
    }
    catch{
        resp.status(500).json({error:error});
    }
})
app.get("/getAll",async(req,resp)=>{
    try{
        const wasteData=await Waste.find();
        if(!wasteData){
            return resp.status(404).json({msg:"user data not found"});
        }
        resp.status(200).json(wasteData);
    }
    catch(erro){
        resp.status(500).json({error:"some error is there"});
    }

})
app.listen(8000);
