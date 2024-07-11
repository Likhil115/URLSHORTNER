const express=require("express")
const router=express.Router();
const urls=require("../model/url");

router.get("/home",async(req,res)=>{
    if(!req.user)return res.redirect('/');
    const data=await urls.find({createdby:req.user._id});
    // console.log(req.user);
    res.render("home",{
        urls:data
    });
})


router.get("/signup",(req,res)=>{
    return res.render("signup");
})
router.get("/",(req,res)=>{
    return res.render("login");
})

module.exports=router