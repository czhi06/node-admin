// backend/server.js  
const express = require('express');  
const bodyParser = require('body-parser');  
const cors = require('cors');  
const jwt = require('jsonwebtoken');  

const app = express();  
const PORT = 3000;  

// 中间件  
app.use(cors());  
app.use(bodyParser.json());  

// 假设的用户数据  
const users = [  
    { username: 'user1', password: 'password1' },  
    { username: 'user2', password: 'password2' },  
];  

// 登录接口  
app.post('/api/login', (req, res) => {  
    const { username, password } = req.body;  
    const user = users.find(user => user.username === username && user.password === password);  

    if (user) {  
        const token = jwt.sign({ username: user.username }, 'secret-key', { expiresIn: '1h' }); // 生成Token  
        res.json({ token }); // 返回token  
    } else {  
        res.status(401).json({ message: 'Invalid username or password' });  
    }  
});  

// 启动服务器  
app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});