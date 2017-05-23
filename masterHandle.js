var express = require('express');
var app = express.Router();

var json=require('./json.js');
var cars=json.cars;
var drivers=json.drivers;

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
    res.send(data);
});
app.post('/agreeApply',(req,res)=>{//通过申请这个不好写
    res.send({code:1});
});
app.post('/refuseApply',(req,res)=>{//同不好写
    res.send({code:1});
});
app.post('/agreeBill',(req,res)=>{
    res.send({code:1});
});
app.post('/refuseBill',(req,res)=>{
    res.send({code:1});
});
app.post('/addCompany',(req,res)=>{
    var params=req.body;
    var companyName=params.companyName
    , presentName=params.presentName
    , companyTel=params.companyTel
    , companyEmail=params.companyEmail
    , companyAccount=params.companyAccount;
    console.log("add company"+companyName);
    res.send({code:1});
});
app.post('/delCompany',(req,res)=>{
    var companyName=req.body.companyName;
    company=company.filter(company=>{return !(companyName==company.companyName);});
    res.send({code:1});
});
app.post('/motifyCompany',(req,res)=>{
    var params=req.body;
    var companyName=params.companyName
    , presentName=params.presentName
    , companyTel=params.companyTel
    , companyEmail=params.companyEmail
    , companyAccount=params.companyAccount;
    console.log("motify company"+companyName);
    res.send({code:1});
});

app.delete('/delCar',(req,res)=>{
    var carNumber=req.body.delNumber;
    cars=cars.filter(car=>{
        if(car.carNumber==delNumber){
            return false;
        }
        return true;
    });
    console.log(cars);
    res.send({code:1});
});
app.delete('/delDriver',(req,res)=>{
    var delNumber=req.body.delNumber;
    drivers=drivers.filter(driver=>{return !(driver.driverNum==delNumber);})
    console.log(drivers);
    console.log("delete driver"+ delNumber);
    res.send({code:1});
});

app.post('/motifyCar',(req,res)=>{
    var data={code:1};
    var params=req.body;
     var driverPhoto=params.driverPhoto
     ,driverName=params.driverName
     ,driverNum=params.driverNum
     ,driverTel=params.driverTel
     ,driverCity=params.driverCity;
     var driver=drivers.find(x=>{return x.driverName==driverNum});
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

     var driver=drivers.find(driver=>{return driver.driverName==driverName});
     driver.driverPhoto=driverPhoto;
     driver.driverNum=driverNum;
     driver.driverTel=driverTel;
     driver.driverCity=driverCity;

     console.log("add driver:"+driverName+" tel:"+driverTel+" code number:"+driverName+" city:"+ driverCity);
     res.send(data);
});
app.get('/apply.json',(req,res)=>{
    res.send(json.apply);
});
app.get('/bill.json',(req,res)=>{
    res.send(json.bill);
});
app.get('/testCar.json',(req,res)=>{
    res.send(cars);
});
app.get('/testDriver.json',(req,res)=>{
    res.send(drivers);
});
app.get('/company.json',(req,res)=>{
    res.send(company);
});

module.exports=app;