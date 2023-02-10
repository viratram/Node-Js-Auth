const express = require("express");
const Router = express.Router();
const User = require("../backend/Models/user")
const veriy=require("../backend/Encrypt/verify")
const {jwtgenerate} = require("../backend/Encrypt/token")
const { generate, checking } = require("../backend/Encrypt/encrypt")
Router.post("/", async (req, res) => {
    try {
        const hashpass = await generate(req.body.password)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpass
        });
        const usersave = await user.save();
        res.send(usersave);
    } catch (error) {
        res.send(error)
    }
})
Router.post("/signin", async (req, res) => {
    try {
        const dbuser = await User.findOne({ email: req.body.email })
        if (!dbuser) {
            res.send("No User Found")
        } else {
            const check = await checking(req.body.password,dbuser.password);
            if (!check) {
                console.log(check)
                res.send("Password Mismatch");
            } else {
                console.log(dbuser.email)
                const token= await jwtgenerate(dbuser.email)
                res.cookie("jwt",token);
                res.send(JSON.stringify(token)); 
            }

        }
    } catch (error) {
        res.send(error)
    }

})
Router.get("/user",veriy,(req,res)=>{
    res.send("This is Admin")
})
Router.get("/data",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    const data=[{
        username:"ram",
        date:new Date().getFullYear(),
        email:"viratram87@gmail.com"
    }]
    res.send(JSON.stringify(data))
})

module.exports = Router;