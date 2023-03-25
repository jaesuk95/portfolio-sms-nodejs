const {WebClient, ErrorCode} = require('@slack/web-api');

const BOT_TOKEN = `${process.env.SLACK_BOT_TOKEN}`;
const slackWeb = new WebClient(BOT_TOKEN);
const CHANNEL = 'test';

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
                                `주문 번호 : ` + `A123`
                        },
                    }
                ]

            });
            // The result contains an identifier for the message, `ts`.
            // console.log(`Successfully send message ${result.ts} in conversation ${INQUIRY_CHANNEL}`);
            console.log(`Successfully send message ${result.ts} in conversation ${CHANNEL}`);
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
    slackTest
}