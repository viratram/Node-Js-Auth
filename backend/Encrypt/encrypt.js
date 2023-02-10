const bcrypt = require("bcrypt");
const level = 10;
const generate = async (pass) => {
    const salt = await bcrypt.genSalt(level);
    const hash = await bcrypt.hash(pass,salt)
    return hash;
}
const checking=async (pass,checkpass)=>{
    try {
        const result=await bcrypt.compare(pass,checkpass)
        return result;
    } catch (err) {
        return false
    }
   
}
module.exports={generate,checking};