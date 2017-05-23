var express = require('express');
var app = express.Router();

var json=require('./json.js');

app.post('/changePwd',function(req,res){
    var data={code:1};
    var password=req.cookies.password;
    var username=req.cookies.username;
    var newPassword=req.body.newPassword;
    var oldPassword=req.body.oldPassword;
    if(password==oldPassword){
        res.cookie("password",newPassword);
    }else{
        data.code=-1;
    }
    res.end(data);
});
app.post('/agreeApply',(req,res)=>{//通过申请这个不好写
    res.end('');
});
app.post('/refuseApply',(req,res)=>{//同不好写
    res.end('');
});
app.post('/agreeBill',(req,res)=>{
    res.end('');
});
app.post('/refuseBill',(req,res)=>{
    res.end('');
});
app.post('/addCompany',(req,res)=>{
    var params=req.body;
    var companyName=params.companyName
    , presentName=params.presentName
    , companyTel=params.companyTel
    , companyEmail=params.companyEmail
    , companyAccount=params.companyAccount;
    console.log("add company"+companyName);
    res.end({code:1});
});
app.post('/delCompany',(req,res)=>{
    var companyName=req.body.companyName;
    res.end({code:1});
});
app.post('/motifyCompany',(req,res)=>{
    var params=req.body;
    var companyName=params.companyName
    , presentName=params.presentName
    , companyTel=params.companyTel
    , companyEmail=params.companyEmail
    , companyAccount=params.companyAccount;
    console.log("motify company"+companyName);
    res.end({code:1});
});

app.delete('/delCar',(req,res)=>{
    var carNumber=req.body.delNumber;
    json.cars=json.cars.filter(car=>{
        if(car.carNumber==delNumber){
            return false;
        }
        return true;
    });
    console.log(json.cars);
    res.end({code:1});
});
app.delete('/delDriver',(req,res)=>{
    var delNumber=req.body.delNumber;
    json.drivers=driver.filter(driver=>{
        if(driver.driverName==delName) return false;
        return true;
    });
    console.log("delete driver"+ delNumber);
    res.end({code:1});
});

app.post('/motifyCar',(req,res)=>{
    var data={code:1};
    var params=req.body;
     var driverPhoto=params.driverPhoto
     ,driverName=params.driverName
     ,driverNum=params.driverNum
     ,driverTel=params.driverTel
     ,driverCity=params.driverCity;
     var driver=json.drivers.find(x=>{x.driverName==driverNum});
     driver.driverName=driverName;
     driver.driverTel=driverTel;
     driver.driverCity=driverCity;
     driver.driverPhoto=driverPhoto;
     console.log("add driver:"+driverName+" tel:"+driverTel+" code number:"+driverName+" city:"+ driverCity);
     res.send(data);
});
app.post('/motifyDriver',(req,res)=>{
    var data={code:1};
    var params=req.body;
     var driverPhoto=params.driverPhoto
     ,driverName=params.driverName
     ,driverNum=params.driverNum
     ,driverTel=params.driverTel
     ,driverCity=params.driverCity;

     var driver=json.drivers.find(driver=>{driver.driverName==driverName});
     driver.driverPhoto=driverPhoto;
     driver.driverNum=driverNum;
     driver.driverTel=driverTel;
     driver.driverCity=driverCity;

     console.log("add driver:"+driverName+" tel:"+driverTel+" code number:"+driverName+" city:"+ driverCity);
     res.send(data);
});







module.exports=app;