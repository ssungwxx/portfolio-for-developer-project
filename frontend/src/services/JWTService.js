import RestService from '@/services/RestService'

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
    },
    setLogin(result) {
      sessionStorage.setItem('jwt', result.token);
      sessionStorage.setItem('isLogin', true);
    }
};
