
$(function(){
// 页面切换
	$('div.leftList ul li').click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	})
// 读取账单信息
	$.ajax({
		type:"get",
		url:"/bill.json",
		data:{},
		dataType:'json',
		success:function(data){
        $.each(data,function(i,item){
   		var tr = '<tr><td>' + item.comName+ '</td><td>' + item.realBill + 
			'</td><td>' + item.comState + '</td><td>' + item.billState + '</td><td><span class="disBill">查看</span></td></tr>' ; 
		// applyBill = new Array();
		// applyBill = item.applyBill;
		$("#billTable").append(tr);  
       		})  
		},
		error:function(){
			alert("请求失败，请稍后再试");
		}
	})
	$("#billTable").on("click","span.disBill",function(){
		that = $(this).closest('tr');
		var index = $('.disBill').index(this);
		var bill = that.children();
	$.ajax({//读取申请金额
		type:"get",
		url:"testMaster/bill.json",
		data:{},
		dataType:'json',
		success:function(data){
			var arr = [];
        $.each(data,function(i,item){
        	arr[i] = item.applyBill;
       		})
        $('#applyBill').html(arr[index]); 
        $('#comName').html(bill[0].innerHTML); 
		$('#realBill').html(bill[1].innerHTML); 
		$('#billState').html(bill[2].innerHTML); 		
		$('#billPanel').css("display","block");
		$('#allScreen').css("display","block");
		}
	})
	})
	$('#allScreen').click(function(){
		$('#billPanel').css("display","none");
		$('#allScreen').css("display","none");
	})
	//通过申请
	$('#agree').click(function(){
		var agree ="comName:"+$('#comName').html()+","+"applyBill:"+$('#applyBill').html();//获取申请公司的名字
		$.ajax({
			type:"post",
			url:"/master/agreeBill",
			data:agree,
			dataType:'json',
			success:function(data){
				if(data){
					$('#billPanel').css("display","none");
					$('#allScreen').css("display","none");
					that.children()[3].innerHTML= "已付款";
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
		var refuse ="refuseCom:"+$('#comName').html()+","+"applyBill:"+$('#applyBill').html();//获取申请公司的名字
		$.ajax({
			type:"post",
			url:"/master/refuseBill",
			data:refuse,
			dataType:'json',
			success:function(data){
				if(data){
					$('#billPanel').css("display","none");
					$('#allScreen').css("display","none");
					that.children()[3].innerHTML= "驳回确认";
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
