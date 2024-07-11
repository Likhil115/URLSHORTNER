const express=require("express");
const router=express.Router();
const shortid=require("shortid")
const url=require("../model/url")

router.post("/",async(req,res)=>{
const shortId=shortid(8);

console.log(shortId+" "+req.body.redirecturl);

const result=await url.create({
    shorturl:shortId,
    redirecturl:req.body.redirecturl,
    vistedhistory:[],
    createdby:req.user._id,
});
res.render("home",{id:shortId})

})


router.get("/",async(req,res)=>{
    
    const result=await url.find({});
    res.status(200).send(result);
})

router.delete("/:id",async(req,res)=>{
    const r=await url.findOneAndDelete(req.params.id);
    res.status(200).send("deleted");

})

router.get("/:shorturl",async(req,res)=>{
    const shorturl=req.params.shorturl;
    const r=await url.findOneAndUpdate({shorturl},{
        $push:{
            vistedhistory:{timestamp:Date.now()}
            
        }
    });
    
    
    res.redirect(r.redirecturl);

})


router.get("/analytics/:shorturl",async(req,res)=>{
    const shorturl=req.params.shorturl;
    const r=await url.findOne({shorturl});
    res.json({totallength:r.vistedhistory.length});


})


module.exports=router;
