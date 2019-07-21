window.onload = function() {
	$("#car_name").on("focus", function() {
		var car_name = $("#car_name").val();
		if(car_name == "输入车牌") {
			$("#car_name").val("");
		}
	});
	$(".next_step").on("click", function() {
		var car_name = $("#car_name").val().toUpperCase();
		if(car_name == "输入车牌" || car_name == "") {
			layer.open({
				content: '请输入车牌',
				skin: 'msg',
				time: 2
			});
		} else if(check_car_name(car_name) == false) {
			layer.open({
				content: '请输入正确车牌',
				skin: 'msg',
				time: 2
			});
		} else {
			$.ajax({
				type: "post",
				url: location.href,
				async: false,
				data: {
					"car_name": car_name
				},
				dataType: "html",
				success: function(data) {
					if(data == 'success') {
						layer.open({
							content: '绑定成功',
							skin: 'msg',
							time: 2
						});
						setTimeout(function(){
							window.location.href="index.php";
						},2000);
					} else {
						layer.open({
							content: '绑定失败',
							skin: 'msg',
							time: 2
						});
					}
				}
			});
		}
	});
}

function check_car_name(car_name) {
	var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
	if(car_name.search(re) == -1) {
		return false;
	} else {
		return true;
	}
}