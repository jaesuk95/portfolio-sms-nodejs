const failedQueue = "processFailed";
const emailService = require("../service/email")
const slackService = require("../service/slack")

function userRegisterEmail(channel) {
    channel.consume('register', async (msg) => {
        const msgBody = msg.content.toString();
        try {
            // 1. 받은 메시지를 파싱하고.
            const data = JSON.parse(msgBody);
            await emailService.sendRegisterEmail(data)
            // 2. 잘 받았으니 ACK를 보내자.
            await channel.ack(msg);
            slackService.slackTest(data)

        } catch (e) {
            let parse = {}
            parse.body = msgBody.toString()
            parse.tag = "userRegister"
            parse.errorMessage = e.message

            await channel.sendToQueue(failedQueue, Buffer.from(JSON.stringify(parse), "utf-8"))
            await channel.nack(msg, true, false)
        }
    })
}

module.exports = {
    userRegisterEmail
}