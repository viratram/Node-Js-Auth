const {jwtvalidator}=require("../Encrypt/token");

module.exports=async (req,res,next)=>{
    const{jwt}=req.cookies;
    const valid= await jwtvalidator(jwt);
    if(valid){
        next();
    }else{
        res.send("Access Denied");
    }
}