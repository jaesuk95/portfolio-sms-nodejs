const redis = require('redis')

const redisClient = redis.createClient({
    socket: {
        host: `${process.env.REDIS_HOST}`,
        port: `${process.env.REDIS_PORT}`
    },
    password: `${process.env.REDIS_PASSWORD}`
});

(async () => {  // redis connect
    await redisClient.connect();
})();

redisClient.on('connect', function () {
    console.log('Redis client connected');
});
redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

async function redisGet(key) {
    return await redisClient.get(key);
}

// function redisRegister(key, value) {
//     redisClient.set(key,value);
//     console.log("Registered new template " + key)
// }

module.exports = {
    redisGet
}