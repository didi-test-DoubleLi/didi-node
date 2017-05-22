var express = require('express');
var app = express.Router();


app.delete('/delDriver',function(req,res){
    var data={code:1};
    var params=req.body;
    var delName=params.delName
    , delDriverNum=params.delDriverNum
    , deleteDriResult=params.deleteDriResult;
    console.log("del driver: "+delName+" code number:"+delDriverNum+" reason:"+deleteDriResult);
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
     console.log("add driver:"+driverName+" tel:"+driverTel+" code number:"+driverName+" city:"+ driverCity);
     res.send(data);
});
app.delete('/deleteCar',function(req,res){
    var data={code:1};
    var params=req.body;
    var delNumber=params.delNumber
    , deleteResult=params.deleteDriResult;
    console.log("delete car:"+delNumber+" reason:"+deleteResult);
    res.send(data);
});
app.post('/addCar',function(req,res){
    var data={code:1};
    var params=req.body;
    var carNumber=params.carNumber
    , carBound=params.carBound
    , useTime=params.useTime
    , bindDriver=params.bindDriver;
    console.log("add car:"+carNumber+" car bound:"+carBound+"use time:"+useTime+" bind driver name:"+bindDriver);
    res.send(data);
});

app.post('/bindCar',function(req,res){
    var data={code:1};
    var params=req.body;
    var bindCar=params.bindCar
    , bindDriName=params.bindDriName
    , bindDriNum=params.bindDriNum;
    console.log("bind car:"+bindCar+" driver name:"+bindDriName+" driver num:"+bindDriNum);
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
