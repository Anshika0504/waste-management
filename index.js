const express=require('express');
const mongoose=require('mongoose');
require("./config/db");
const cors=require('cors');
const dotenv=require('dotenv');
const Waste=require('./models/waste');
const waste = require('./models/waste');
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

app.get("/getone/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const wasteExist = await Waste.findById(id);
        if (!wasteExist) {
            return resp.status(404).json({ msg: "user not found" });
        }
        resp.status(200).json(wasteExist);
    } catch (error) {
        resp.status(500).json({ error: "some error has been occurred" });
    }
});


app.delete("/delete/:id",async(req,resp)=>{
    try{
        const id=req.params.id;
        const wasteExist=await Waste.findById(id);
        if(!wasteExist){
            return resp.status(400).json({msg:"waste does not found"});
        }
        await Waste.findByIdAndDelete(id);
        resp.status(200).json({msg:"waste has been deleted successfully"});
    }
    catch(error){
        resp.status(404).json({error:"some unexpected error has been occured"})
    }
})

app.put("/update/:id", async (req, resp) => {
    try {
        const id = req.params.id;
        const wasteExist = await Waste.findById(id);
        if (!wasteExist) {
            return resp.status(400).json({ msg: "user not found" });
        }
        const updatedData = await Waste.findByIdAndUpdate(id, req.body, { new: true });
        resp.status(200).json(updatedData);
    } catch (error) {
        resp.status(500).json({ error: "some unexpected error has occurred" });
    }
});

app.listen(8000);
