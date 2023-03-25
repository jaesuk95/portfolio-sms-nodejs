const jwt = require('jsonwebtoken');
// const secretkey = require('../config/secretkey');
const secret = process.env.SECRRET_KEY;

let decoded = null;

module.exports = {
    verify: (token) => { // access token 검증
        let buff = Buffer.from(secret,'base64');
        let base64 = buff.toString('utf-8');
        decoded = jwt.verify(token, base64); // secret key를 이용한 복호화
        try {
            return {
                ok: true,
                id: decoded.userId,
                role: decoded.auth,
            };
        } catch (err) {
            return {
                ok: false,
                message: err.message,
            };
        }
    },
};
