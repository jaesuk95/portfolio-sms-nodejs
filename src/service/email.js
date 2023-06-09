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
        name: data.variables.user.name,
        email: data.receiver,
        registerDate: data.variables.user.registerDate,
        link: data.variables.user.link,
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
    );
    console.log("'" + data.receiver + "'님에게 회원가입 이메일 발송")
}


// 앞으로 밑에있는 array 으로 변할 예정
async function sendUserOrderEmail(data) {

    const userOrder = data.variables.userOrder;

    // userOrder -> orderDetail (@OneToMany)
    let ejsArrayData = [];
    for (const orderDetail of data.variables.userOrder.orderDetails) {
        ejsArrayData.push({
            productName: orderDetail.productName,
            orderStatus: userOrder.status,   // detailOrderStatus === '주문접수'
            quantity: orderDetail.quantity,
            productPrice: orderDetail.productPrice,
            // 주소
            postal: orderDetail.postal,
            addressDetail: orderDetail.addressDetail,
            name: orderDetail.username,
            phone: orderDetail.phone
        });
    }

    let ejsData = {
        email: data.receiver,
        totalPrice: userOrder.totalPrice,
        paymentMethod: userOrder.method,

        orderDetails: ejsArrayData
    }

    let template = findEmailTemplate(data);

    transporter.sendMail(
        {
            from: data.sender,
            to: data.receiver,
            subject: data.variables.userOrder.title,
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
    );
    console.log("'" + data.receiver + "'님에게 회원가입 이메일 발송")
}


function findEmailTemplate(data) {
    return redisService.redisGet(EMAIL_KEY + data.templateId);
}

module.exports = {
    sendRegisterEmail,
    sendUserOrderEmail
}