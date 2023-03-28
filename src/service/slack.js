const {WebClient, ErrorCode} = require('@slack/web-api');

const BOT_TOKEN = `${process.env.BOT_OAUTH_TOKEN}`;
const slackWeb = new WebClient(BOT_TOKEN);
const CHANNEL = process.env.SLACK_CHANNEL;
const ORDER_CHANNEL = process.env.SLACK_CHANNEL_ORDER;

function slackTest(data) {
    (async () => {
        try {
            // Post a message to the channel, and await the result. https://api.slack.com/methods/chat.postMessage
            const result = await slackWeb.chat.postMessage({
                text: "PORTFOLIO TEST :rotating_light:",
                channel: CHANNEL,

                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",

                            text: `:rotating_light: Portfolio Test :rotating_light:` + `\n` +
                                `주문 번호 : ` + `A123` + `\n` +
                                `TESTING : ` + `B123`
                        },
                    }
                ]

            });
            // The result contains an identifier for the message, `ts`.
            // console.log(`Successfully send message ${result.ts} in conversation ${INQUIRY_CHANNEL}`);
            console.log(`Successfully sent message in conversation '${CHANNEL}'`);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                console.log(error.data);
            } else {
                console.log('Well, that was unexpected.');
            }
        }
    })();
}

function userOrderAlert(data) {
    (async () => {
        try {
            // Post a message to the channel, and await the result. https://api.slack.com/methods/chat.postMessage
            const result = await slackWeb.chat.postMessage({
                text: "ORDER :rotating_light:",
                channel: ORDER_CHANNEL,

                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",

                            text: `:rotating_light: Portfolio Test :rotating_light:` + `\n` +
                                `주문 번호 : ` + `${data.variables.userOrder.userOrderNumber}` + `\n` +
                                `TESTING : ` + `B123`
                        },
                    }
                ]

            });
            // The result contains an identifier for the message, `ts`.
            // console.log(`Successfully send message ${result.ts} in conversation ${INQUIRY_CHANNEL}`);
            console.log(`Successfully sent message in conversation '${ORDER_CHANNEL}'`);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                console.log(error.data);
            } else {
                console.log('Well, that was unexpected.');
            }
        }
    })();
}

module.exports = {
    slackTest,
    userOrderAlert
}
