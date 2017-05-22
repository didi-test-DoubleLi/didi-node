var express = require('express');
var app = express();

//为了获取请求参数
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//为了映射静态文件
app.use('/static', express.static('didi-test'));

app.get('/', function (req, res) {
    res.send('Hello World');
    console.log(req.url);
    var pathname=__dirname+url.parse(req.url).pathname;
});

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
app.post('addCar',function(req,res){
    
})
