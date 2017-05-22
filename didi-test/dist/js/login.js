$(function(){
	$("div.login ul li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
	$('#company').click(function(){
		$('.form1').css("display","block");
		$('.form2').css("display","none");
	})
	$('#master').click(function(){
		$('.form1').css("display","none");
		$('.form2').css("display","block");
	})
	$('button#loginCom').click(function(){
		if($('#companyAdmin').val()&&$('#companyPassword').val()!=null){
			var logAll = $('#logAll').serializeArray();
		$.ajax({
			type:"POST",
			url:"/loginCompany",
			data:logAll,
			dataType:'json',
			success:function(data){//增加了参数
				if(data.code==1){
					window.open("Company.html");
					console.log(logAll);						
				}else if(data.code==-1){
					alert("登录失败");
				}
			},
			error:function(){
				alert("登录失败，请稍后再试");
				}
			})
		}else{
			alert("请将用户名和密码填写完整");
		}
		})
	$('button#loginMas').click(function(){
		if($('#masterAdmin').val()&&$('#masterPassword').val()!=null){
		var logAll = $('#logAll').serializeArray();
		$.ajax({
			type:"POST",
			url:"/loginMaster",
			data:logAll,
			dataType:'json',
			success:function(data){
				if(data.code==1){
					window.open("master-company.html");
					console.log(logAll);						
				}else if(data.code==-1){
					alert("登录失败");
				}
			},
			error:function(){
				alert("登录失败，请稍后再试");
				}
			})
		}else{
			alert("请将用户名和密码填写完整");
		}
	})
})