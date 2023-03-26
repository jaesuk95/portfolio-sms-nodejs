const failedQueue = "processFailed";
const emailService = require("../service/email")
const slackService = require("../service/slack")

function userRegisterEmail(channel) {
    channel.consume('data', async (msg) => {
        const msgBody = msg.content.toString();
        try {
            // 1. 받은 메시지를 파싱하고.
            const data = JSON.parse(msgBody);
            // await emailService.sendRegisterEmail(data)
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

// 문자 발송 (알리고 서비스는 사업자번호가 필수이므로 테스트는 불가했다.)
async function sendText(channel) {
    channel.consume('alimMessage', async (msg) => {
        // 1. 받은 메시지를 파싱하고.
        const msgBody = msg.content.toString();
        try {
            const data = JSON.parse(msgBody);

            let name = data.name

            let smsBody = `[알리고 메시지]
${name}님 알리고 메시지를 사용하기 위해서는 사업등록 번호가 필요하므로 테스트 테스트 단계에서는 불가했습니다.
*알리고 팁*
알리고 홈페이지에서 템플릿 등록하면 된다. 그 이후, 알리고에서 템플릿 검수한다.`

            let form = new FormData();
            form.append("key", process.env.ALIGO_KEY)
            form.append("user_id", process.env.ALIGO_ID)
            form.append("sender", process.env.ALIM_SENDER)
            form.append("receiver", data.number)
            form.append("msg", smsBody)
            form.append("testmode_yn", data.testYN) // Y = do not send (confirms test mode)

            let formHeaders = form.getHeaders()

            let axiosResponse = await axios.post("https://apis.aligo.in/send/", form, {
                headers: {
                    ...formHeaders
                }
            });

            if (axiosResponse.data.result_code === "1") {
                await channel.ack(msg);
                let date = new Date();
                console.log(`'ALLIGO' Message has been sent to ${data.number}`);
            } else {
                data.response = axiosResponse.data
                await channel.sendToQueue("failedMessage", Buffer.from(JSON.stringify(data), "utf-8"))
                await channel.nack(msg, true, false)
            }

        } catch (e) {
            // 관리자에게 슬랙으로 알림
            let parse = {}
            parse.body = msgBody.toString()
            parse.error = "처리할 수 없는 에러"
            parse.errorMessage = e.message

            await channel.sendToQueue("failedMessage", Buffer.from(JSON.stringify(parse), "utf-8"))
            await channel.nack(msg, true, false)

            // slackService.deliverFailed(parse)
        }

    })
}



module.exports = {
    userRegisterEmail,
    sendText
}