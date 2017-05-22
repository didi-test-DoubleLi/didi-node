
$(function(){
//表单验证 一个有bug的验证……
var reg1 = /[^x00-xff]/; //匹配双字节 公司名称&&姓名
var reg2 = /[0-9]{11}/ //匹配手机号码
var reg3 = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ //匹配邮箱
// 页面切换
	$('div.leftList ul li').click(function(){
	$(this).addClass("active").siblings().removeClass("active");
});
	// 读取合作伙伴信息
	$.ajax({
		type:"get",
		url:"testMaster/company.json",
		data:{},
		dataType:'json',
		success:function(data){
        $.each(data,function(i,item){
   		var tr = '<tr><td>' + item.companyName+ '</td><td>' + item.presentName + 
			'</td><td>' + item.companyTel + '</td><td>' + item.companyEmail + '</td><td>' + 
			item.companyAccount + '</td><td><span class="changeCom">修改</span><span class="deleteCom"> 删除</span></td></tr>' ; 
		$("#companyTable").append(tr);  
       		})  
		},
		error:function(){
			alert("请求失败，请稍后再试");
		}
	})
// 新增合作伙伴
$("#newCompany").click(function(){
	$("#newPanel").css("display","block");
	$("#allScreen").css("display","block");
	});
$("#allScreen").click(function(){
	$("#newPanel").css("display","none");
	$("#changePanel").css("display","none");
	$("#allScreen").css("display","none");
});
//新增信息
$("#submitNew").click(function(){
	var companyName = $("#companyName").val();
	var presentName = $('#presentName').val();
	var companyTel = $('#companyTel').val();
	var companyEmail = $('#companyEmail').val();
	var companyAccount = $('#companyAccount').val();
	if(companyName&&presentName&&companyTel&&companyEmail&&companyAccount==undefined){
		alert("请将合作伙伴信息填写完整");
	}else if(!reg1.test(companyName)){
		alert("公司名称输入有误！");
	}else if(!reg1.test(presentName)){
		alert("对接人姓名输入有误！");
	}else if(!reg2.test(companyTel)){
		alert("联系方式输入有误！");
	}else if(!reg3.test(companyEmail)){
		alert("邮箱格式输入有误！");
	}else if(!companyAccount){
		alert("请将对公账户正确填入！");
	}
	else{
		var formNew = $('#formNew').serializeArray();
		$.ajax({
			type:"get",
			url:"https://www.weibangong.com/weadmin/inner",
			data:formNew,
			dataType:'json',
			success:function(){
			if(true){
				alert("合作伙伴增加成功！");
				$("#newPanel").css("display","none");
				$("#allScreen").css("display","none");
				var index = "<tr><td>"+companyName+"</td><td>"+presentName+"</td><td>"+companyTel+"</td><td>"
				+companyEmail+"</td><td>"+companyAccount+"</td><td><span class='changeCom'>修改</span> <span class='deleteCom'>删除</span></td></tr>";
				$("#companyTable").append(index);
				console.log(formNew);
				$("input").val("");						
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
//选择删除
$("#companyTable").on("click","span.deleteCom",function(){
	var con = confirm("确认删除该公司的合作信息吗？");
	var del = $(this).closest('tr');
	if(con){
		var delMessage = "delMessage:"+$(this).closest('tr').children()[0].innerHTML;//获取删除公司的名字
		$.ajax({
			type:"get",
			url:"https://www.weibangong.com/weadmin/inner",
			data:delMessage,
			dataType:'json',
			success:function(){
			if(true){
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
$("#companyTable").on("click","span.changeCom",function(){
	$("#changePanel").css("display","block");
	$("#allScreen").css("display","block");
	that = $(this).closest('tr');
	var change = that.children();
	$("input#changeName").val(change[0].innerHTML);
	$("input#changePre").val(change[1].innerHTML);
	$("input#changeTel").val(change[2].innerHTML);
	$("input#changeEmail").val(change[3].innerHTML);
	$("input#changeAccount").val(change[4].innerHTML);
})
//提交修改
	$("#submitChange").click(function(){
	var changeName = $("#changeName").val();
	var changePre = $('#changePre').val();
	var changeTel = $('#changeTel').val();
	var changeEmail = $('#changeEmail').val();
	var changeAccount = $('#changeAccount').val();
	if(changeName&&changePre&&changeTel&&changeEmail&&changeAccount==undefined){
		alert("请将合作伙伴信息填写完整");
	}else if(!reg1.test(changeName)){
		alert("公司名称输入有误！");
	}else if(!reg1.test(changePre)){
		alert("对接人姓名输入有误！");
	}else if(!reg2.test(changeTel)){
		alert("联系方式输入有误！");
	}else if(!reg3.test(changeEmail)){
		alert("邮箱格式输入有误！");
	}else if(!changeAccount){
		alert("请将对公账户正确填入！");
	}else{
		var formChange = $('#formChange').serializeArray();
		$.ajax({
			type:"get",
			url:"https://www.weibangong.com/weadmin/inner",
			data:formChange,
			dataType:'json',
			success:function(){
			if(true){
				alert("修改成功！");
				console.log(formChange);		
				that.replaceWith("<tr><td>"+changeName+"</td><td>"+changePre+"</td><td>"+changeTel+"</td><td>"
				+changeEmail+"</td><td>"+changeAccount+"</td><td><span class='changeCom'>修改</span> <span class='deleteCom'>删除</span></td></tr>");
				$("#changePanel").css("display","none");
				$("#allScreen").css("display","none");
				$("input").val("");						
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
})


