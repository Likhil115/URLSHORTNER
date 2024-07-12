const express=require("express");
const app=express();
const mongoose=require("mongoose");
const route=require("./routes/route")
const urls=require("./model/url");

const path=require("path");
const staticroute=require("./routes/staticrouter")
const userroute=require("./routes/userroutes.js");

const cookieParser = require("cookie-parser");
const {checkforauthentication,restrictTo}=require("./middleware/auth.js")
mongoose.connect("mongodb+srv://likhilvenkat123:9Juiw3r6ZweNE1rQ@cluster0.prkohun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("connected"));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(checkforauthentication);


app.set("view engine","ejs");
app.set("views",path.resolve("./view"))
app.use("/user",userroute);
app.use("/" ,staticroute);


const port=5000;




app.use("/url",restrictTo(["normal"]),route);

app.listen(port,()=>{console.log(`Listening at ${port}`)});
