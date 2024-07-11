const express=require("express");
const { model } = require("mongoose");
const user=require("../model/user")
const {setUser,getUser}=require("../service/auth")


async function handleusersignup(req,res){
    
    const {name,email,password}=req.body;
    await user.create({
        name,
        email,
        password
    });
    
    return res.redirect("/");
}
async function handleuserlogin(req,res){
    
    const {email,password}=req.body;
   const User=await user.findOne({email,password});

   if(!User){
    return res.redirect("/");}
   
    const token=setUser(User);
    
    res.cookie("uid",token);
   
    return res.redirect("/home");
}


module.exports={handleusersignup,handleuserlogin}