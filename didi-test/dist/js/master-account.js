// 页面切换
$(function(){
	$('div.leftList ul li').click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	})
	$('#submitPassword').click(function(){
		if($('#oldPassword').val()&&$('#newPassword').val()&&$('#rePassword').val()!=null){
			if($('#newPassword').val()!=$('#rePassword').val()){
				alert('两次密码输入不同！');
			}else{
				var account = $('#changePassword').serializeArray();
				$.ajax({
					type:"get",
					url:"https://www.weibangong.com/weadmin/inner",
					data:account,
					dataType:'json',
					success:function(){
						if(true){
							alert("密码修改成功！");
							console.log(account);						
						}else{
							alert("请求失败，请稍后再试");
						}
					},
					error:function(){
						alert("请求失败，请稍后再试");
					}
				})
			}
		}else{
			alert("请将密码填写完整");
		}

	})


})
