// const amqp = require('amqplib');
// const queue = require("./queue")
// const amqpURL = `amqp://${process.env.RABBIT_ID}:${process.env.RABBIT_PW}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`;
//
//
// const listenForMessages = async () => {
//     //채널을 연결
//     const connection = await amqp.connect(amqpURL);
//     const channel = await connection.createChannel();
//     await channel.prefetch(1);
//
//     await consume({connection, channel});
// }
//
// /**
//  * RabbitMQ Listener
//  * */
// const consume = ({connection, channel}) => {
//     return new Promise((resolve, reject) => {
//
//         // // 원하는 Queue 의 이름을 적어준다.
//         queue.userRegisterEmail(channel);
//
//         // Queue 가 닫혔거나. 에러가 발생하면 reject
//         connection.on('close', (err) => {
//             return reject(err);
//         })
//
//         connection.on('error', (err) => {
//             return reject(err);
//         })
//     })
// }
//
// // await listenForMessages();
// (async () => {
//     try{
//         await listenForMessages();
//     } catch (e) {
//         console.log(e)
//     }
// })();
