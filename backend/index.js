const express = require('express');
const cors = require('cors'); /* CORS 오류 해결 */
const app = express(); /* Express 서버 객체 초기화 */
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const config = require('./config.json');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploaded/' });
const fs = require('fs');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json()); /* JSON 형식으로 반환 */
app.use(cookieParser());
app.use('/uploaded', express.static(__dirname + '/uploaded'));

mongoose.connect(config.db_string);
const secret = config.jwt_key;

/* POST 방식으로 회원가입 API 열어주기 */
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await User.create({ username, password });
    res.json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

/* POST 방식으로 로그인 API 열어주기 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await User.findOne({ username });
  if (result == null) {
    res.status(400).json('Incorrect information.');
  } else {
    /* 사용자가 입력한 비밀번호가 정확하다면 */
    const check = password == result.password;
    if (check) {
      /* JWT 토큰 발급 */
      jwt.sign({ username, id: result._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          username,
          id: result._id,
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
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('');
});

app.get('/post', async (req, res) => {
  const posts = await Post.find()
    .populate('author', ['username'])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id);
  res.json(postDoc);
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const token = req.cookies.token;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const result = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(result);
  });
});

app.listen(7777);
