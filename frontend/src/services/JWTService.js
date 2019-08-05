// JWT
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

export default {
    decode(token) {
        try {
            var decoded = jwt.verify(token, secretObj.secret);
            return decoded;
        } catch (err) {
            return -1;
        }
    }
};
