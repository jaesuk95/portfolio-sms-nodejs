const IP = require('ip');

const user_detail = (req, res, next) => {
    console.log(req.uri);
    console.log('this is under middleware');

    const ipAddress = IP.address();
    console.log(`${req.uri} has been requested by ip address = ${ipAddress}`)
    next();
};

module.exports = user_detail;