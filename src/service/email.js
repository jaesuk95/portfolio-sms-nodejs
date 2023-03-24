// 노드 메일러
const nodemailer = require("nodemailer");                                   // npm install nodemailer // 이미 설치되어 있음
const ejs = require("ejs");
const redisService = require("../database/redis")

const EMAIL_KEY = "EMAIL:TEMPLATE:";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jaesuk.developer@gmail.com',
        pass: 'developer8080@'
    }
})

async function sendRegisterEmail(data) {

    let ejsData = {
        name: data.variables.user.이름,
        email: data.receiver,
        registerDate: data.variables.user.가입일,
        link: data.variables.user.링크,
    }

    // database 설치 해주면 된다
    let template = findEmailTemplate(data);

    transporter.sendMail(
        {
            from: data.sender,
            to: data.receiver,
            subject: data.variables.user.title,
            html: ejs.render(await template, {data: ejsData}),
            // text: ejs.render(await template, {data: ejsData}),
            ses: {
                Tags: [
                    {
                        Name: "tag_name",
                        Value: "tag_value",
                    },
                ],
            },
        }
        // ,
        // (err, info) => {
        //   console.log(err.message);
        //   // console.log(info.envelope);
        //   console.log(info.messageId);
        // }
    );
    console.log("'" + data.receiver + "'님에게 회원가입 이메일 발송")
}

function findEmailTemplate(data) {
    return redisService.redisGet(EMAIL_KEY + data.templateId);
}

module.exports = {
    sendRegisterEmail
}