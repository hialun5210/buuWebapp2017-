function show_msg_auto(msg, url) {
	$('body').append('<div class="layerbox"></div>');
	var htmltop = '<div class="layer_main"><div class="layermchild">';
	var htmlfoot = '</div>';
	var btns = '';
	if (url != '') {
		btns = '<a href="javascript:" class="jump_a_canel" >取消</a><a href="javascript:" class="jump_a">确定</a>';
	} else {
		btns = '<a href="javascript:" class="jump_a" >确定</a>';
	}
	htmlfoot += btns + '</div>';
	$('.layerbox').height($(document).height());
	var left = ($(window).width()) / 2 - 110;
	$('body').append(htmltop + msg + htmlfoot);
	var scroll_height = $(document).scrollTop();
	$('.layer_main').animate({
		'top': scroll_height + 120,
		'left': left
	}, 500);
	$(document).on("click", ".jump_a_canel", function() {
		$('.layer_main').animate({
			'top': scroll_height + 120
		}, 500, function() {
			$(this).remove();
		})
		$('.layerbox').fadeOut(1000, function() {
			$(this).remove()
		});
	}).on("click", ".jump_a", function() {
		$('.layer_main').animate({
			'top': scroll_height + 120
		}, 500, function() {
			$(this).remove();
		})
		$('.layerbox').fadeOut(1000, function() {
			$(this).remove();
			url != '' ? window.location = url : "";
		});

	});
}

function show_msg(msg, url) {
	$('body').append('<div class="layerbox"></div>');
	var htmltop = '<div class="layer_auto">';
	var htmlfoot = '</div>';
	$('.layerbox').height($(document).height());
	var left = ($(document).width() - 500) / 2;
	$('body').append(htmltop + msg + htmlfoot);
	var scroll_height = $(document).scrollTop();
	$('.layer_auto').animate({
		'top': scroll_height + 120
	}, 500);
	msgdsq = setTimeout(function() {
		$('.layer_auto').animate({
			'top': scroll_height + 120
		}, 500, function() {
			$(this).remove();
		})
		$('.layerbox').fadeOut(1000, function() {
			$(this).remove()
		});
		if (url != '') {
			location.href = url;
		}
	}, 2000);


}

//微信用户添加地址校验
function Checkaddress_add() {
   var add_name=$("#add_name");
   var add_tel=$("#add_tel");
   var add_code=$("#add_code");
   var add_area=$("#add_area");
   var add_adress_text=$("#add_adress_text");
   if(add_name.val()=="")
   {
	    showTips("名字不能为空哦！","");
	    add_name.focus();
		return false;   
   }
   if(add_tel.val()=="")
   {
	    showTips("手机号码不能为空哦！","");
	    add_tel.focus();
		return false;   
   }
   if(!checkMobile(add_tel.val()))
		{
		   showTips("手机只能为11位的数字哦！","")
		   add_tel.focus();
		   return false;
		}
   if(add_code.val()=="")
   {
	    showTips("手机验证码不能为空哦！","");
	    add_code.focus();
		return false;   
   }
   if(add_adress_text.val()=="")
   {
	    showTips("地址不能为空哦！","");
	    add_adress_text.focus();
		return false;   
   }
    return true;
}

function CheckUserName() {

	var userName = $("#username");
	var iphone = $("#iphone");
	var yyrq = $("#yyrq");
	var yysj = $("#yysj");
	var szqy = $("#szqy");
	var wxdz = $("#wxdz");


	if (userName.val() == "") {
		show_msg("请填写报修人", '')
		userName.focus();
		return false;
	}
	if (iphone.val() == "") {
		show_msg("请输入您的手机号", '');
		iphone.focus();
		return false;
	}
	if (!/[0-9]{11}/.test(iphone.val())) {
		show_msg("手机号码应为11位数字", '')
		iphone.focus();
		return false;
	}


	if (yyrq.val() == "请选择日期") {
		show_msg("请选择预约日期", '')
		yyrq.focus();
		return false;
	}
	if (yysj.val() == "选择预约时间") {
		show_msg("请选择预约日期", '');
		yysj.focus();
		return false;
	}
	if (wxdz.val() == "") {
		show_msg("请输入您的地址", '');
		wxdz.focus();
		return false;
	}

	return true;
}

/**
 * 手机号码格式验证
 */
function checkMobile(no) {
	var re = /17\d{9}|13\d{9}|15\d{9}|18\d{9}|14\d{9}/;
	if (!re.test(no) || no.length != 11) {
		return false;
	}
	return true;
}

/**
 * 阻止冒泡事件
 */
function cancelBubble(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}

$(function() {

	$("#btn_submit").on("click", function() {

		if (CheckUserName()) {
			alert("提交成功");

		}

	})

	$("#suggest_submit").on("click", function() {

		show_msg_auto("请填写报修人", '');

	})


})


//确认框
//confirm({
//    title: "移动商机",
//    content: ApproveTxt,
//    onConfirm: function () { 
//    },
//    onCancel: ""
//});
///拓展：加入msgtype参数，问号：doubt，成功：success,提示：info
/*var confirm = function(c_opts) {
	var c_opts = $.extend({
		needhead: true,
		autoclose: true,
		msgtype: "info",
		title: "",
		content: "",
		canceltxt: "取消",
		confirmtxt: "确定",
		onInit: "",
		onConfirm: "",
		onCancel: ""
	}, c_opts);
	var that = this;
	$("body").css({
		"overflow": "hidden"
	});
	$("#confirmLayer").show().addClass("bounceIn");
	setTimeout(function() {
		var _top = $(window).height() - $("#confirmLayer").height();
		$("#confirmLayer").css({
			"top": _top / 2 - 10 + $(document).scrollTop()
		});
	}, 50);

	$("#confirmLayer").show().addClass("bounceIn");
	if (c_opts.needhead) {
		if (c_opts.title != "") {
			$("#confirm-head").html(c_opts.title).show();
		} else {
			var _hclass = "icon-tips-" + c_opts.msgtype;
			$("#confirm-head").html("<p class='" + _hclass + "'></p>").show();
		}
	} else {
		$("#confirm-head").hide();
	}
	if (c_opts.content != "") {
		$("#confirm-content").html(c_opts.content);
	}
	if (c_opts.onInit != "" && typeof c_opts.onInit == "function") {
		c_opts.onInit();
	}
	$("#confirmMask").show();
	$("#onConfirmBtn").text(c_opts.confirmtxt).off("click").on("click", function() {
		if (c_opts.autoclose) {
			that.closeconfirm();
		}
		if (c_opts.onConfirm != "" && typeof c_opts.onConfirm == "function") {
			c_opts.onConfirm(this);
		}
	});
	$("#onCancelBtn").text(c_opts.canceltxt).off("click").on("click", function() {
		that.closeconfirm();
		if (c_opts.onCancel != "" && typeof c_opts.onCancel == "function") {
			c_opts.onCancel(this);
		}
	});
	////注：由于 amazeui自带的confirm弹出框无法进行重复赋值，操作，所以暂时废弃
	//$('#confirmLayer').modal({
	//    relatedTarget: c_opts.relatedTarget,
	//    onConfirm: function (options) {
	//        if (c_opts.onConfirm != "" && typeof c_opts.onConfirm == "function") {
	//            c_opts.onConfirm(this.relatedTarget);
	//        }                 
	//    },
	//    // closeOnConfirm: false,
	//    onCancel: function () {

	//    }
	//});
},
	closeconfirm: function() {
		$("#confirmLayer,#confirmMask").removeClass("bounceIn").hide();
		$("body").css({
			"overflow": "auto"
		});
	}*/