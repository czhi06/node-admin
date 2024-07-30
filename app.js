/*
 * Start at 2022.
 * Author: ximingx.
 * Github: https://github.com/ximingx
 * Csdn: https://ximingx.blog.csdn.net/
 */
// 导入 express 模块
// 创建 express 的服务器实例
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
// 跨域设置
const cors = require('cors')
app.use(cors())
// req.body 解析
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// 5. JWT字符串解析
const expressJWT = require('express-jwt')
// 2. 定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'ximingx';
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 `req.user` 属性上
app.use(expressJWT.expressjwt({secret: secretKey, algorithms: ['HS256']}).unless({path: ['/api/ximingx/v1/login']}));
// 路由
app.use('/api/login', require('./routes/userRoutes'));
// 全局捕获错误
app.use((err, req, res, next) => {
    // 这次错误是由 token 解析失败导致的
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '无效的token',
        })
    }
    return res.status(500).send('未知的错误!');
});
// 监听端口
app.listen(3000, () => {
    console.log(`server is running at http://localhost:${port}`);
});
