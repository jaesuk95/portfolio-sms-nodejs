const aligoapi = require("aligoapi");

// 여기에 필요한거 다 있음
// https://www.npmjs.com/package/aligoapi?activeTab=explore

const kakaoAuthData = {
    apikey: process.env.ALIGO_KEY,
    // 이곳에 발급받으신 api key를 입력하세요
    userid: process.env.ALIGO_ID,
    // 이곳에 userid를 입력하세요
    // token: ''
    // 이곳에 token api로 발급받은 토큰을 입력하세요
    token: process.env.KAKAO_TOKEN
}
// token을 제외한 인증용 데이터는 모든 API 호출시 필수값입니다.
// token은 토큰생성을 제외한 모든 API 호출시 필수값입니다.

// 토큰 기간 설정
const token = (req, res) => {
    req.body.time = '1'
    req.body.type = 'y' // y(년), m(월), d(일), h(시), i(분), s(초)
    aligoapi.token(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}


const templateAdd = (req, res) => {
    // 템플릿관리 - 템플릿 등록

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    // tpl_name: 템플릿 이름
    // tpl_content: 템플릿 내용 // (최대 1,000자)
    /*** 필수값입니다 ***/
    // tpl_button: 템플릿 버튼
    // }
    // req.body 요청값 예시입니다.

    aligoapi.templateAdd(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const templateRequest = (req, res) => {
    // 템플릿관리 - 템플릿 검수요청

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    // tpl_code: 템플릿 코드
    /*** 필수값입니다 ***/
    // }
    // req.body 요청값 예시입니다.

    aligoapi.templateRequest(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const alimtalkTempList = (req, res) => {
    // 템플릿관리 - 템플릿 리스트

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    /*** 필수값입니다 ***/
    // tpl_code: 템플릿 코드
    // }
    // req.body 요청값 예시입니다.

    aligoapi.templateList(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const templateModify = (req, res) => {
    // 템플릿관리 - 템플릿 수정

    // req.body = {
    /*** 필수값입니다 ***/
    // senderkey: 발신프로필 키
    // tpl_code: 템플릿 코드
    // tpl_name: 템플릿 이름
    // tpl_content: 템플릿 내용 // (최대 1,000자)
    /*** 필수값입니다 ***/
    // tpl_button: 템플릿 버튼
    // }
    // req.body 요청값 예시입니다.

    aligoapi.templateModify(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}


const friendList = (req, res) => {
    aligoapi.friendList(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const friendAdd = (req, res) => {
    aligoapi.profileAdd(req, res)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

// 카카오 인증요청
const kakaoAuth = (req, res) => {
    aligoapi.profileAuth(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

// 카카오 알림톡 플친 프로필 카테고리
const kakaoCategory = (req, res) => {
    aligoapi.profileCategory(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

// 카카오 알림톡 전송
const alimtalkSend = (req, res) => {
    aligoapi.alimtalkSend(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const sendHistoryList = (req, res) => {
    aligoapi.historyList(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

const sendHistoryDetail = (req, res) => {
    aligoapi.historyDetail(req, kakaoAuthData)
        .then((r) => {
            res.send(r)
        })
        .catch((e) => {
            res.send(e)
        })
}

module.exports = {
    token,
    friendList,
    kakaoAuth,
    alimtalkSend,
    kakaoCategory,
    friendAdd,
    alimtalkTempList,
    sendHistoryList,
    sendHistoryDetail,
    templateAdd,
    templateModify,
    templateRequest
}
