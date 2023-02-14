const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Auth = require("./Routes/auth");
const cors=require("cors");
const dotenv = require("dotenv");
// const cookieParser=require("cookie-parser");
const cookieParser = require("cookie-parser");
dotenv.config();
const PORT = 3000;
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, (err) => {
    console.log("db connected");
})
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use("/signup", Auth);
app.listen(PORT, (err) => {
    if (!err) {
        console.log(`http://localhost:${PORT}`)
    }
})

