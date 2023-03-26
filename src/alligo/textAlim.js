const aligoapi = require('aligoapi')

const AuthData = {
    key: process.env.ALIGO_KEY,
    user_id: process.env.ALIGO_ID
}

AuthData.testmode_yn = process.env.ALIGO_ID

const send = (req, res) => {
    // 메시지 발송하기
    // req.body = {
    /*** 필수값입니다 ***/
    // sender,  // (최대 16bytes)
    // receiver: req.body.receiver, // 컴마()분기 입력으로 최대 1천명
    // msg: req.body.msg,	// (1~2,000Byte)
    /*** 필수값입니다 ***/
    //   msg_type: SMS(단문), LMS(장문), MMS(그림문자)
    //   title: 문자제목(LMS, MMS만 허용) // (1~44Byte)
    //   destination: %고객명% 치환용 입력
    //   rdate: 예약일(현재일이상) // YYYYMMDD
    //   rtime: 예약시간-현재시간기준 10분이후 // HHMM
    //   image: 첨부이미지 // JPEG, PNG, GIF
    // }
    aligoapi.send(req, AuthData)
        .then((r) => {
            res.send([r, process.env.EMAIL])
        })
        .catch((e) => {
            res.send(e)
        })
}

const sendMass = (req, res) => {
    // 메시지 대량발송하기

    // req.body = {
    /*** 필수값입니다 ***/
    //   sender: 발신자 전화번호 // (최대 16bytes)
    //   rec_1: 수신자 전화번호1
    //   msg_1: 메시지 내용1	// (1~2,000Byte)
    //   msg_type: SMS(단문), LMS(장문), MMS(그림문자)
    //   cnt: 메세지 전송건수 // (1~500)
    /*** 필수값입니다 ***/
    //   title: 문자제목(LMS, MMS만 허용) // (1~44Byte)
    //   destination: %고객명% 치환용 입력
    //   rdate: 예약일(현재일이상) // YYYYMMDD
    //   rtime: 예약시간-현재시간기준 10분이후 // HHMM
    //   image: 첨부이미지 // JPEG, PNG, GIF
    // }
    console.log(req.body)
    aligoapi.sendMass(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })

}

const list = (req, res) => {
    // 전송결과보기

    // req.body = {
    //   page: 페이지번호 // (기본 1)
    //   page_size: 페이지당 출력갯수 // (기본 30) 30~500
    //   start_date: 조회시작일자 // (기본 최근일자) YYYYMMDD
    //   limit_day: 조회마감일자
    // }
    // req.body 요청값 예시입니다.

    aligoapi.list(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })

}

const smsList = (req, res) => {
    // 전송결과보기 상세

    // req.body = {
    /*** 필수값입니다 ***/
    //   mid: 메세지 고유ID
    /*** 필수값입니다 ***/
    //   page: 페이지번호 // (기본 1)
    //   page_size: 페이지당 출력갯수 // (기본 30) 30~500
    //   start_date: 조회시작일자 // (기본 최근일자) YYYYMMDD
    //   limit_day: 조회마감일자
    // }
    // req.body 요청값 예시입니다.

    aligoapi.smsList(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const remain = (req, res) => {
    // 발송가능건수

    aligoapi.remain(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const cancel = (req, res) => {
    // 예약취소하기

    // req.body = {
    /*** 필수값입니다 ***/
    //   mid: 메세지 고유ID
    /*** 필수값입니다 ***/
    // }
    // req.body 요청값 예시입니다.

    aligoapi.cancel(req, AuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

module.exports = {
    send,
    sendMass,
    list,
    smsList,
    remain,
    cancel,
}