
$(function(){
//表单验证 一个有bug的验证……
var reg1 = /[^x00-xff]/; //匹配双字节
var reg2 = /[0-9]{11}/ //匹配手机号码
var reg3 = /[0-9]/ //匹配数字… 暂时就这么匹配驾照吧
// 页面切换
	$('div.leftList ul li').click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});
	// 读取司机信息
	$.ajax({
		type:"get",
		url:"/master/testDriver.json",
		data:{},
		dataType:'json',
		success:function(data){
        $.each(data,function(i,item){
   		var tr = '<tr><td></td><td>' + item.driverName+ '</td><td>' + item.driverNum + 
			'</td><td>' + item.driverTel + '</td><td>' + item.driverCity + '</td><td>' + 
			item.driverPoint + '</td><td><span class="changeDri">修改</span> <span class="deleteDri">删除</span></td></tr>' ; 
		$("#driverTable").append(tr);  
       		})  
		},
		error:function(){
			alert("请求失败，请稍后再试");
		}
	})
// 新增合作伙伴
$("#newDriver").click(function(){
	$("#newDriverPanel").css("display","block");
	$("#allScreen").css("display","block");
	});
$("#allScreen").click(function(){
	$("#newDriverPanel").css("display","none");
	$("#changeDriverPanel").css("display","none");
	$("#allScreen").css("display","none");
});
//新增信息
$("#submitNewDriver").click(function(){
	var driverPhoto = $("#driverPhoto").val();
	var driverName = $('#driverName').val();
	var driverNum = $('#driverNum').val();
	var driverTel = $('#driverTel').val();
	var driverCity = $('#driverCity').val();
	if(driverPhoto&&driverName&&driverNum&&driverTel&&driverCity==undefined){
		alert("请将司机信息填写完整");
	}else if(!reg1.test(driverName)){
		alert("司机姓名输入有误！");
	}else if(!reg3.test(driverNum)){
		alert("驾驶证编号输入有误！");
	}else if(!reg2.test(driverTel)){
		alert("联系方式输入有误！");
	}else if(!reg1.test(driverCity)){
		alert("邮箱格式输入有误！");
	}else{
		var driverForm = $('#driverForm').serializeArray();
		$.ajax({
			type:"post",
			url:"/addDriver",
			data:driverForm,
			dataType:'json',
			success:function(data){
			if(data.code==1){
				alert("司机增加成功！");
				$("#newDriverPanel").css("display","none");
				$("#allScreen").css("display","none");
				var index = "<tr><td><img src = '"+driverPhoto+"'/></td><td>"+driverName+"</td><td>"+driverNum+"</td><td>"
				+driverTel+"</td><td>"+driverCity+"</td><td>暂无</td><td><span class='changeDri'>修改</span> <span class='deleteDri'>删除</span></td></tr>";
				$("#driverTable").append(index);
				console.log(driverForm);
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
$("#driverTable").on("click","span.deleteDri",function(){
	var con = confirm("确认删除该车辆的信息吗？");
	var del = $(this).closest('tr');
	if(con){
		var delMessage = +$(this).closest('tr').children()[2].innerHTML;//获取删除司机的编号
		$.ajax({
			type:"delete",
			url:"/master/delDriver",
			data:{"delNumber":delMessage},
			dataType:'json',
			success:function(data){
			if(data.code==1){
				del.remove();
				console.log(delMessage);						
				}else{
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
$("#driverTable").on("click","span.changeDri",function(){
	$("#changeDriverPanel").css("display","block");
	$("#allScreen").css("display","block");
	that = $(this).closest('tr');
	var change = that.children();
	console.log(change[0].innerHTML);
	// $("input#changePhoto").val(change[0].innerHTML);
	$("input#changeDriName").val(change[1].innerHTML);
	$("input#changeDriNum").val(change[2].innerHTML);
	$("input#changeDriTel").val(change[3].innerHTML);
	$("input#changeCity").val(change[4].innerHTML);
	point = change[5].innerHTML;
})
//提交修改
	$("#submitChangeDriver").click(function(){
	var changePhoto = $("#changePhoto").val();
	var changeDriName = $('#changeDriName').val();
	var changeDriNum = $('#changeDriNum').val();
	var changeDriTel = $('#changeDriTel').val();
	var changeCity = $('#changeCity').val();
	if(changePhoto&&changeDriName&&changeDriNum&&changeDriTel&&changeCity==undefined){
		alert("请将司机信息填写完整");
	}else if(!reg1.test(changePhoto)){
		alert("请上传司机照片！");
	}else if(!reg1.test(changeDriName)){
		alert("司机姓名输入有误！");
	}else if(!reg3.test(changeDriNum)){
		alert("驾驶证编号输入有误！");
	}else if(!reg2.test(changeDriTel)){
		alert("联系方式输入有误！");
	}else if(!reg1.test(changeCity)){
		alert("所在城市输入有误！");
	}else{
		var formChangeDri = $('#formChangeDri').serializeArray();
		$.ajax({
			type:"post",
			url:"/master/motifyDriver",
			data:formChangeDri,
			dataType:'json',
			success:function(data){
			if(data.code==1){
				alert("修改成功！");
				console.log(formChangeDri);			
				that.replaceWith("<tr><td>"+changePhoto+"</td><td>"+changeDriName+"</td><td>"+changeDriNum+"</td><td>"
				+changeDriTel+"</td><td>"+changeCity+"</td><td>"+point+"</td><td><span class='changeDri'>修改</span> <span class='deleteDri'>删除</span></td></tr>");
				$("#changeDriverPanel").css("display","none");
				$("#allScreen").css("display","none");
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
})


