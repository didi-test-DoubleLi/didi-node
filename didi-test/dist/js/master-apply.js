
$(function(){
// 页面切换
	$('div.leftList ul li').click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	})
// 读取申请信息
	$.ajax({
		type:"get",
		url:"testMaster/apply.json",
		data:{},
		dataType:'json',
		success:function(data){
        $.each(data,function(i,item){
   		var tr = '<tr><td>' + item.applyType+ '</td><td>' + item.applyCom + 
			'</td><td>' + item.applyTime + '</td><td>' + item.dealState + '</td><td><span class="disApply">查看</span></td></tr>' ; 
		$("#applyTable").append(tr);  
       		})  
		},
		error:function(){
			alert("请求失败，请稍后再试");
		}
	})
	$("#applyTable").on("click","span.disApply",function(){
		that = $(this).closest('tr');
		var index = $('.disApply').index(this);
		var apply = that.children();
	$.ajax({//读取申请金额
		type:"get",
		url:"testMaster/apply.json",
		data:{},
		dataType:'json',
		success:function(data){
			var arr = [];
        $.each(data,function(i,item){
        	arr[i] = item.applyContent;
       		})
        $('#applyContent').html(arr[index]); 
		$('#applyType').html(apply[0].innerHTML); 
		$('#applyCom').html(apply[1].innerHTML); 		
		$('#applyPanel').css("display","block");
		$('#allScreen').css("display","block");
		}
	})
	})
	$('#allScreen').click(function(){
		$('#applyPanel').css("display","none");
		$('#allScreen').css("display","none");
	})
	//通过申请
	$('#agree').click(function(){
		var agree ="applyType:"+$('#applyType').html()+","+"applyCom:"+$('#applyCom').html()+","+"applyContent:"+$('#applyContent').html();//获取申请公司的名字
		$.ajax({
			type:"get",
			url:"https://www.weibangong.com/weadmin/inner",
			data:agree,
			dataType:'json',
			success:function(){
				if(true){
					$('#applyPanel').css("display","none");
					$('#allScreen').css("display","none");
					that.children()[3].innerHTML= "已通过";
					console.log(agree);						
				}else{
					alert("请求失败，请稍后再试");
				}
			},
			error:function(){
				alert("请求失败，请稍后再试");
				}
			})
	})
	//拒绝申请
	$('#refuse').click(function(){
		var refuse ="refuseType:"+$('#applyType').html()+","+"refuseCom:"+$('#applyCom').html()+","+"refuseContent:"+$('#applyContent').html();
		$.ajax({
			type:"get",
			url:"https://www.weibangong.com/weadmin/inner",
			data:refuse,
			dataType:'json',
			success:function(){
				if(true){
					$('#applyPanel').css("display","none");
					$('#allScreen').css("display","none");
					that.children()[3].innerHTML= "已拒绝";
					console.log(refuse);						
				}else{
					alert("请求失败，请稍后再试");
				}
			},
			error:function(){
				alert("请求失败，请稍后再试");
				}
			})
	})
})
