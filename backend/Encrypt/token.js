const jwt = require("jsonwebtoken");

const jwtgenerate = async (email) => {
    const token = await jwt.sign(
        { email }
        , 'secret',
        { expiresIn: "24hours" }
    );
    return token
}
const jwtvalidator = async (token) => {
    try {
        const valid = await jwt.verify(token, 'secret');
        return valid;
    } catch (error) {
        return false;
    }

}
module.exports.jwtgenerate = jwtgenerate;
module.exports.jwtvalidator = jwtvalidator;