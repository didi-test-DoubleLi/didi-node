var express = require('express');
var app = express.Router();

var json=require('./json.js');


app.delete('/delDriver',function(req,res){
    var data={code:1};
    var params=req.body;
    var delName=params.delName;
    json.drivers.find(driver=>{driver.driverName==delName}).status=-1;
    //, delDriverNum=params.delDriverNum
    //, deleteDriResult=params.deleteDriResult;
    console.log("del driver: "+delName);
    res.send(data);
});
app.post('/addDriver',function(req,res){
    var data={code:1};
    var params=req.body;
     var driverPhoto=params.driverPhoto
     ,driverName=params.driverName
     ,driverNum=params.driverNum
     ,driverTel=params.driverTel
     ,driverCity=params.driverCity;
     json.drivers.push({
        "driverName": driverName,
        "driverNum": driverNum,
        "driverTel": driverTel,
        "driverCity": driverCity,
        "driverPoint": "60",
        "bindCar":"",
        "status":0
     });
     console.log("add driver:"+driverName+" tel:"+driverTel+" code number:"+driverName+" city:"+ driverCity);
     res.send(data);
});
app.delete('/deleteCar',function(req,res){
    var data={code:1};
    var params=req.body;
    var delNumber=params.delNumber;
    json.cars.find(car=>{
        car.carNumber==delNumber;
    }).status=-1;

    //, deleteResult=params.deleteDriResult;
    console.log("delete car:"+delNumber);
    res.send(data);
});
app.post('/addCar',function(req,res){
    var data={code:1};
    var params=req.body;
    var carNumber=params.carNumber
    , carBound=params.carBound
    , useTime=params.useTime
    , bindDriver=params.bindDriver;
    json.cars.push({
        "carNumber": carNumber,
        "carBound": carBound,
        "useTime": useTime,
        "bindDriver": bindDriver,
        "status":0
    });
    console.log(json.cars);
    console.log("add car:"+carNumber+" car bound:"+carBound+"use time:"+useTime+" bind driver name:"+bindDriver);
    res.send(data);
});

app.post('/bindCar',function(req,res){
    var data={code:1};
    var params=req.body;
    var bindCar=params.bindCar
    , bindDriName=params.bindDriName
    , bindDriNum=params.bindDriNum;
    var driver=json.drivers.find(x=>{x.driverName==bindDriName});
    if(bindCar==undefined || bindCar== ''){
        driver.bindCar="";
    }else if(driver.bindCar && driver.bindCar!=""){
        data.code=-1;
    }else if(json.cars.find(x=>{x.carNumber==bindCar})){
        driver.bindCar=bindCar;
        console.log(json.drivers);
    }
    //console.log("bind car:"+bindCar+" driver name:"+bindDriName+" driver num:"+bindDriNum);
    res.send(data);
});
app.post('/confirmMoney',function(req,res){
    var data={code:1};
    var params=req.body;
    var changeBill=params.changeBill;
    console.log(req.cookies.userName+" change bill to "+changeBill);
    res.send(data);
});
module.exports=app;
