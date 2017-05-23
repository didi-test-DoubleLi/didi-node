
$(function(){
//表单验证 一个有bug的验证……
var reg1 = /[^x00-xff]/; //匹配双字节
var reg2 = /\d/
var reg3 = / / //匹配车牌号 …… 太可怕了我先不写了
// 页面切换
	$('div.leftList ul li').click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});
	//读取车辆信息
	$.ajax({
		type:"get",
		url:"/master/testCar.json",
		data:{},
		dataType:'json',
		success:function(data){
        $.each(data,function(i,item){
        	  // <td>辽A123456</td><td>丰田</td><td>3年</td><td>暂无</td>
   		var tr = '<tr><td>' + item.carNumber+ '</td><td>' + item.carBound + 
			'</td><td>' + item.useTime + '</td><td>' + item.bindDriver + '</td><td><span class="changeCar">修改</span> <span class="deleteCar">删除</span></td>'; 
		$("#carTable").append(tr);  
       		})  
		},
		error:function(){
			alert("请求失败，请稍后再试");
		}
	})
// 新增合作伙伴
$("#newCar").click(function(){
	$("#newCarPanel").css("display","block");
	$("#allScreen").css("display","block");
	});
$("#allScreen").click(function(){
	$("#newCarPanel").css("display","none");
	$("#changeCarPanel").css("display","none");
	$("#allScreen").css("display","none");
});
//新增车辆信息
$("#submitNewCar").click(function(){
	var carNumber = $("#carNumber").val();
	var carBound = $('#carBound').val();
	var useTime = $('#useTime').val();
	var bindDriver = $('#bindDriver').val();
	if(carNumber&&carBound&&useTime&&bindDriver==undefined){
		alert("请将车辆信息填写完整");
	}else if(!carNumber){
		alert("请将车牌号码正确填入！");
	}else if(!reg1.test(carBound)){
		alert("汽车品牌输入有误！");
	}else if(!useTime){
		alert("请将使用时间正确填入！");
	}else if(!reg1.test(bindDriver)){
		alert("绑定司机输入有误！");
	}else{
		var carForm = $('#carForm').serializeArray();
		$.ajax({
			type:"post",
			url:"/addCar",
			data:carForm,
			dataType:'json',
			success:function(data){
			if(data.code==1){
				alert("车辆增加成功！");
				$("#newCarPanel").css("display","none");
				$("#allScreen").css("display","none");
				var index = "<tr><td>"+carNumber+"</td><td>"+carBound+"</td><td>"+useTime+"</td><td>"
				+bindDriver+"</td><td><span class='changeCar'>修改</span> <span class='deleteCar'>删除</span></td></tr>";
				$("#carTable").append(index);
				console.log(carForm);
				$("input").val("");						
			}else if(data.code==-1){
					alert("请求失败，请稍后再试");
				}
			},
			error:function(){
				alert("请求失败，请稍后再试");
				}
			})
		}
	})
//选择删除
$("#carTable").on("click","span.deleteCar",function(){
	var con = confirm("确认删除该车辆的信息吗？");
	var del = $(this).closest('tr');
	if(con){
		var delMessage =$(this).closest('tr').children()[0].innerHTML;
		$.ajax({
			type:"delete",
			url:"/master/delCar",
			data:{"delNumber":delMessage},
			dataType:'json',
			success:function(data){
			if(data.code==1){
				del.remove();
				console.log(delMessage);						
				}else if(data.code==-1){
					alert("请求失败，请稍后再试");
				}
			},
			error:function(){
				alert("请求失败，请稍后再试");
			}
		})
	}
})
//选择修改
$("#carTable").on("click","span.changeCar",function(){
	$("#changeCarPanel").css("display","block");
	$("#allScreen").css("display","block");
	that = $(this).closest('tr');
	var change = that.children();
	$("input#changeNum").val(change[0].innerHTML);
	$("input#changeBound").val(change[1].innerHTML);
	$("input#changeTime").val(change[2].innerHTML);
	$("input#changeBind").val(change[3].innerHTML);
})
//提交修改
	$("#submitChangeCar").click(function(){
	var changeNum = $("#changeNum").val();
	var changeBound = $('#changeBound').val();
	var changeTime = $('#changeTime').val();
	var changeBind = $('#changeBind').val();
	var changeAccount = $('#changeAccount').val();
	if(changeNum&&changeBound&&changeTime&&changeBind==undefined){
		alert("请将车辆信息填写完整");
	}else if(!carNumber){
		alert("请将车牌号码正确填入！");
	}else if(!reg1.test(carBound)){
		alert("汽车品牌输入有误！");
	}else if(!useTime){
		alert("请将使用时间正确填入！");
	}else if(!reg1.test(bindDriver)){
		alert("绑定司机输入有误！");
	}else{
		var formChangeCar = $('#formChangeCar').serializeArray();
		$.ajax({
			type:"post",
			url:"/master/motifyCar",
			data:formChangeCar,
			dataType:'json',
			success:function(data){
			if(data.code==1){
				alert("修改成功！");
				that.replaceWith("<tr><td>"+changeNum+"</td><td>"+changeBound+"</td><td>"+changeTime+"</td><td>"
				+changeBind+"</td><td><span class='changeCar'>修改</span> <span class='deleteCar'>删除</span></td></tr>");
				$("#changeCarPanel").css("display","none");
				$("#allScreen").css("display","none");
				$("input").val("");				
				console.log(formChangeCar);						
				}else if(data.code==-1){
					alert("请求失败，请稍后再试");
				}
			},
			error:function(){
				alert("请求失败，请稍后再试");
				}
			})

	}	
})
})


