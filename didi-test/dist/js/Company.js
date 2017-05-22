// 页面切换
$(function () {
	$('div.leftList ul li').click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	})
	// 读取司机信息
	$.ajax({
		type: "get",
		url: "testMaster/testDriver.json",
		data: {},
		dataType: 'json',
		success: function (data) {
			$.each(data, function (i, item) {
				var tr = '<tr><td></td><td>' + item.driverName + '</td><td>' + item.driverNum +
					'</td><td>' + item.driverTel + '</td><td>' + item.driverCity + '</td><td>' +
					item.driverPoint + '</td></tr>';
				$("#driverTable").append(tr);
			})
		},
		error: function () {
			alert("请求失败，请稍后再试");
		}
	})
	// 读取车辆信息
	$.ajax({
		type: "get",
		url: "testMaster/testCar.json",
		data: {},
		dataType: 'json',
		success: function (data) {
			$.each(data, function (i, item) {
				// <td>辽A123456</td><td>丰田</td><td>3年</td><td>暂无</td>
				var tr = '<tr><td>' + item.carNumber + '</td><td>' + item.carBound +
					'</td><td>' + item.useTime + '</td><td>' + item.bindDriver + '</td><td>';
				$("#carTable").append(tr);
			})
		},
		error: function () {
			alert("请求失败，请稍后再试");
		}
	})
	//导航折叠
	$('#car-fold').click(function () {
		$('li.c-fold').toggle();
		$('#carList').css("display", "block");
		$('#driverChn').css("display", "none");
		$('#driverList').css("display", "none");
		$('#driverDel').css("display", "none");
		$('#carDel').css("display", "none");
		$('#carChn').css("display", "none");
		$('#bindCD').css("display", "none");
		$('#billCheck').css("display", "none");

	})
	$('#driver-fold').click(function () {
		$('li.d-fold').toggle();
		$('#carList').css("display", "none");
		$('#driverChn').css("display", "none");
		$('#driverList').css("display", "block");
		$('#driverDel').css("display", "none");
		$('#carDel').css("display", "none");
		$('#carChn').css("display", "none");
		$('#bindCD').css("display", "none");
		$('#billCheck').css("display", "none");
	})
	$('li.d-fold:eq(0)').click(function () {
		$('#carList').css("display", "none");
		$('#driverList').css("display", "none");
		$('#driverDel').css("display", "none");
		$('#driverChn').css("display", "block");
		$('#carDel').css("display", "none");
		$('#carChn').css("display", "none");
		$('#bindCD').css("display", "none");
		$('#billCheck').css("display", "none");
	})
	$('li.d-fold:eq(1)').click(function () {
		$('#carList').css("display", "none");
		$('#driverList').css("display", "none");
		$('#driverDel').css("display", "block");
		$('#driverChn').css("display", "none");
		$('#carDel').css("display", "none");
		$('#carChn').css("display", "none");
		$('#bindCD').css("display", "none");
		$('#billCheck').css("display", "none");
	})
	$('li.c-fold:eq(0)').click(function () {
		$('#carList').css("display", "none");
		$('#driverList').css("display", "none");
		$('#driverChn').css("display", "none");
		$('#driverDel').css("display", "none");
		$('#carDel').css("display", "none");
		$('#carChn').css("display", "block");
		$('#bindCD').css("display", "none");
		$('#billCheck').css("display", "none");
	})
	$('li.c-fold:eq(1)').click(function () {
		$('#carList').css("display", "none");
		$('#driverList').css("display", "none");
		$('#driverChn').css("display", "none");
		$('#driverDel').css("display", "none");
		$('#carDel').css("display", "block");
		$('#carChn').css("display", "none");
		$('#bindCD').css("display", "none");
		$('#billCheck').css("display", "none");
	})
	$('#bind-cd').click(function () {
		$('#carList').css("display", "none");
		$('#driverList').css("display", "none");
		$('#driverChn').css("display", "none");
		$('#driverDel').css("display", "none");
		$('#carDel').css("display", "none");
		$('#carChn').css("display", "none");
		$('#bindCD').css("display", "block");
		$('#billCheck').css("display", "none");
	})
	$('#bill').click(function () {
		$('#carList').css("display", "none");
		$('#driverList').css("display", "none");
		$('#driverDel').css("display", "none");
		$('#driverChn').css("display", "none");
		$('#carDel').css("display", "none");
		$('#carChn').css("display", "none");
		$('#bindCD').css("display", "none");
		$('#billCheck').css("display", "block");
	})
	var reg1 = /[^x00-xff]/; //匹配双字节
	var reg2 = /[0-9]{11}/ //匹配手机号码
	var reg3 = /[0-9]/ //匹配数字… 暂时就这么匹配驾照吧
	//删除司机申请
	$('#submitdeleteDriver').click(function () {
		var delName = $('#delName').val();
		var delDriverNum = $('#delDriverNum').val();
		var deleteDriResult = $('#deleteDriResult').val();
		if (!reg1.test(delName)) {
			alert("司机姓名输入有误！");
		} else if (!reg3.test(delDriverNum)) {
			alert("司机编号输入有误！");
		} else if (!deleteDriResult) {
			alert("请填入删除原因！");
		} else {
			var deleteDriver = $('#deleteDriver').serializeArray();
			$.ajax({
				type: "delete",
				url: "/delDriver",
				data: deleteDriver,
				dataType: 'json',
				success: function (data) {
					if (data.code == 1 ) {
						alert("删除申请提交成功！");
						console.log(deleteDriver);
					} else {
						alert("请求失败，请稍后再试");
					}
				},
				error: function () {
					alert("请求失败，请稍后再试");
				}
			})
			$("input").val("");
			$("textarea").val("");
		}
	})
	//新增司机验证
	$("#submitNewDriver").click(function () {
		var driverPhoto = $("#driverPhoto").val();
		var driverName = $('#driverName').val();
		var driverNum = $('#driverNum').val();
		var driverTel = $('#driverTel').val();
		var driverCity = $('#driverCity').val();
		if (driverPhoto && driverName && driverNum && driverTel && driverCity == undefined) {
			alert("请将司机信息填写完整");
		} else if (!reg1.test(driverName)) {
			alert("司机姓名输入有误！");
		} else if (!reg3.test(driverNum)) {
			alert("司机编号输入有误！");
		} else if (!reg2.test(driverTel)) {
			alert("联系方式输入有误！");
		} else if (!reg1.test(driverCity)) {
			alert("邮箱格式输入有误！");
		} else {
			var addDriver = $('#addDriver').serializeArray();
			$.ajax({
				type: "post",
				url: "/addDriver",
				data: addDriver,
				dataType: 'json',
				success: function (data) {
					if (data.code== 1) {
						alert("申请提交成功！");
						console.log(addDriver);
					} else if(data.code==-1){
						alert("请求失败，请稍后再试");
					}
				},
				error: function () {
					alert("请求失败，请稍后再试");
				}
			})
			$("input").val("");
		}
	})
	//删除车辆申请
	$('#submitdeleteCar').click(function () {
		var delNumber = $('#delNumber').val();
		var deleteResult = $('#deleteResult').val();
		if (!reg3.test(delNumber)) {
			alert("车牌号码输入有误！");
		} else if (!deleteResult) {
			alert("请填入删除原因！");
		} else {
			var deleteCar = $('#deleteCar').serializeArray();
			$.ajax({
				type: "delete",
				url: "/deleteCar",
				data: deleteCar,
				dataType: 'json',
				success: function (data) {
					if (data.code==1) {
						alert("删除申请提交成功！");
						console.log(deleteCar);
					} else of(data.code==-1){
						alert("请求失败，请稍后再试");
					}
				},
				error: function () {
					alert("请求失败，请稍后再试");
				}
			})
			$("input").val("");
			$("textarea").val("");
		}
	})
	//新增车辆申请
	$("#submitNewCar").click(function () {
		var carNumber = $("#carNumber").val();
		var carBound = $('#carBound').val();
		var useTime = $('#useTime').val();
		var bindDriver = $('#bindDriver').val();
		if (carNumber && carBound && useTime && bindDriver == undefined) {
			alert("请将车辆信息填写完整");
		} else if (!carNumber) {
			alert("请将车牌号码正确填入！");
		} else if (!reg1.test(carBound)) {
			alert("汽车品牌输入有误！");
		} else if (!useTime) {
			alert("请将使用时间正确填入！");
		} else if (!reg1.test(bindDriver)) {
			alert("绑定司机输入有误！");
		} else {
			var addCar = $('#addCar').serializeArray();
			$.ajax({
				type: "post",
				url: "/addCar",
				data: addCar,
				dataType: 'json',
				success: function (data) {
					if (data.code==1) {
						alert("申请提交成功！");
						console.log(addCar);
					} else if(data.code==-1){
						alert("请求失败，请稍后再试");
					}
				},
				error: function () {
					alert("请求失败，请稍后再试");
				}
			})
			$("input").val("");
		}
	})
	//人车绑定申请
	$('#submitBind').click(function () {
		var bindCar = $('#bindCar').val();
		var bindDriName = $('#bindDriName').val();
		var bindDriNum = $('#bindDriNum').val();
		if (!reg3.test(bindCar)) {
			alert("车牌号码输入有误！");
		} else if (!reg3.test(bindDriNum)) {
			alert("司机编号输入有误！");
		} else if (!reg1.test(bindDriName)) {
			alert("司机姓名输入有误！");
		} else {
			var bind = $('#bind').serializeArray();
			$.ajax({
				type: "post",
				url: "/bindCar",
				data: bind,
				dataType: 'json',
				success: function (data) {
					if (data.code==1) {
						alert("申请提交成功！");
						console.log(bind);
					} else if(data.code==-1){
						alert(data.msg);
					}
				},
				error: function () {
					alert("请求失败，请稍后再试");
				}
			})
			$("input").val("");
		}
	})
	$('#submitChangeBill').click(function () {
		$('#billPanel').css("display", "block");
		$('#allScreen').css("display", "block");
	})
	$('#submitmonthBill').click(function () {
		if ($("#billState").html() == "未处理") {
			alert("您已确认当月账单");
			$("#billState").html("已确认");
		}
	})
	var reg = /[0-9]/g;
	$('#submitChange').click(function () {
		if (reg.test($('#changeBill').val())) {
			$('#billPanel').css("display", "none");
			$('#allScreen').css("display", "none");
			var changeBill = $('#changeBill').val();
			$("#changeMoney").html(changeBill);
			var change = $('#applyChange').serialize();
			$.ajax({
				type: "post",
				url: "/confirmMoney",
				data: change,
				dataType: 'json',
				success: function (data) {
					if (data.code==1) {
						alert("申请提交成功！");
						$("#billState").html("已修改");
						$("#submitmonthBill").addClass("disabled");
						console.log(change);
					} else if(data.code==-1){
						alert(data.msg);
					}
				},
				error: function () {
					alert("请求失败，请稍后再试");
				}
			})
			$('input').val("");
		} else {
			alert("请输入正确数额!");
			$('input').val("");
		}
	})
	$('#allScreen').click(function () {
		$('#billPanel').css("display", "none");
		$('#allScreen').css("display", "none");
		$('input').val("");
	})
})