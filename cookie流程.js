const express = require('express');
const cookieSession = require('cookie-session');

express()
    .use(cookieSession({
        name: 'session',
        keys: ['123456'],// 加密密钥
        maxAge: 24 * 60 * 60 * 1000 // 有效期: 24小时
    }))
    .get('/', (req, res) => {
        console.log(req.session);
        res.send('index');
    })
    .get('/login', (req, res) => {
        // 写入cookie
        req.session.user = {
            username: 'rose',
            password: 123456
        }
        /* res.writeHead(200,{
            'set-Cookie':'username=123456'
        })*/
        res.end('login');
    })
    .listen(3000, () => {
        console.log('success');
    })