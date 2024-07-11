const jwt=require("jsonwebtoken")

const secret="userinfo"

function setUser(user){
   return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret)
}

function getUser(id){
    if(!id)return null;
   return jwt.verify(id,secret);
}


module.exports={setUser,getUser};