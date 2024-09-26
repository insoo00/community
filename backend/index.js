const express = require('express');
const cors = require('cors'); /* CORS 오류 해결 */
const app = express(); /* Express 서버 객체 초기화 */
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const config = require('./config.json');

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json()); /* JSON 형식으로 반환 */
app.use(cookieParser());

mongoose.connect(config.db_string);
const secret = config.jwt_key;

/* POST 방식으로 회원가입 API 열어주기 */
app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const result = await User.create({username, password});
        res.json(result);
    } catch(e) {
        res.status(400).json(e);
    }
})

/* POST 방식으로 로그인 API 열어주기 */
app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const result = await User.findOne({username});
    if (result == null) {
        res.status(400).json('Incorrect information.');
    } else {
        /* 사용자가 입력한 비밀번호가 정확하다면 */
        const check = password == result.password;
        if (check) {
            /* JWT 토큰 발급 */
            jwt.sign({username, id: result._id}, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    username,
                    id: result._id
                });
            });
        } else {
            res.status(400).json('Incorrect information.');
        }
    }
});

app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('');
})

app.listen(7777);