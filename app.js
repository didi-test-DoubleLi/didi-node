var express = require('express');
var app = express();
var login=require('./login.js');
var companyHandle=require('./companyHandle.js');



//为了获取请求参数
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 为了 request 获取cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//为了映射静态文件
app.use('/static', express.static('didi-test'));

// 导入其他路由文件
app.use("/",login);
app.use("/",login);
app.use('/',companyHandle);

app.get('/', function (req, res) {
    res.send('Hello World');
    console.log(req.url);
    var pathname=__dirname+url.parse(req.url).pathname;
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})