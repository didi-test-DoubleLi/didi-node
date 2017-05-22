var express = require('express');
var app = express.Router();

app.post('/loginCompany',function(req,res){
    var data={};
    //console.log(req.body);
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
    //console.log(req.body);
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

module.exports=app;
