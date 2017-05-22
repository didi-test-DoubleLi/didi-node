var express = require('express');
var app = express();

//为了获取请求参数
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/loginCompany',function(req,res){
    var data={};
    console.log(req.body);
    var user=req.body.companyAdmin;
    var password=req.body.companyPassword;
    
    if(user===password){
        data.code=1;
        res.cookie("userName",user);
        res.cookie("password",password);
        res.cookie("companyName","Test Company");
    }else{
        data.code=-1;
    }
    
    res.send(data);
});
app.post('/loginMaster',function(req,res){
    var data={};
    console.log(req.body);
    var user=req.body.masterAdmin;
    var password=req.body.masterPassword;
    if(user===password){
        data.code=1;
        res.cookie("userName",user);
        res.cookie("password",password);
    }else{
        data.code=-1;
    }
    res.send(data);
});
