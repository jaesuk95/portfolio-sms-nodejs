const express = require('express')
const dotenv = require('dotenv').config();
const app = express()   //가져온 express 모듈의 function을 이용해서 새로운 express 앱을 만든다.

app.use(express.json());

// const port = 4000 //포트는 4000번 해도되고, 5000번 해도 된다. -> 이번엔 5000번 포트를 백 서버로 두겠다.
// const port = 4000


app.use("/api", require("./middleware/trackip"));

app.get('/test', function (req, res) {
    try {
        return res.status(200).send();
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/api/test', function (req, res) {
    try {
        return res.status(200).send();
    } catch (e) {
        res.status(400).send(e.message);
    }
});


// 잘못된 uri request 대체하는 방식
// 404 middleware
app.use((req,res,next)=> {
    const url = req.url;
    console.log(`request ${url} has not been found`)
    res.send({error: '404 not found error'});
})

app.listen(process.env.PORT, function () {
    console.log(`listening on http://localhost:${process.env.PORT}`)
});

// app.listen(4000, function () {
//     console.log(`listening on http://localhost:4000`)
// });
