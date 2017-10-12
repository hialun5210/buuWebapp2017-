
$(function() {
    
	//选择区域
	 $("#selectarea").on("click", function () {
                var $this = $(this);
                ShowModal.show({
                    modal: "#selectarea-modal",
                    clickli: "li",
                    closeid: "#modal-close",
                    callback: function (val, text) {
                        $this.val(text);
						$("#selectareahid").val(val);
                    },
                });
            });
	
	 //选择区域
	  $(".area_a").on("click", function () {
          $("#select_area").fadeIn();
		   $("#select_area").prev().fadeIn();
	 })
	 $("#select_area").on("click","li.active,span", function () {
			  $this=$(this);
			  $this.parent().parent().fadeOut(); 
			  $this.parent().parent().prev().fadeOut();
			  
			   
      });
	
	 //setTimeout(function(){$("#show_upload_pro").css({ "display": "none","visibility":"visible" });},500);



	//内容提交
	$("#buubtn").on("click", function() {
		$("#buuform").ajaxSubmit({
			url: "",
			type: "post",
			success: function(result) {
				alert("提交成功！");
				location.href = "succes.html";
			}
		});
	});

//折叠上下arrow
	$(".confirm_header,.confirm_li").on("click", function() {
		var $this = $(this);
		var $em=$this.find("em");
		if ($em.length>0) {
			$this.next("div").slideToggle();
			if($em.hasClass("active"))
			{
				$em.removeClass("active");
			}
			else{
                $em.addClass("active");
			}
			
		} else {
			
		}
	});

//工人确认价格及选择是否生成扫码支付
$(".protocol").on("click","span", function() {
var $this = $("#saoma_checkbox");
var $creat_saoma_pay=$("input[name=creat_saoma_pay]");
$this.toggleClass("selected");
  if($creat_saoma_pay.attr("checked"))
   {
    $creat_saoma_pay.attr("checked", false);
   }
   else
   {
    $creat_saoma_pay.attr("checked", true);
   }
})



	/*--下拉框change改变颜色--*/
	$(".js-selectli").change(function() {
		$(this).removeClass("colora9");
	});

	//上传图片
	/*$("#upload_img").on("click",".upload_pre",function(){

		var $this=$(this);
		$("#example-img").find("img").attr("src", "http://files.jb51.net/image/enkj_300.gif");
		var _imghtml=$("#example-img").html(),_addimg=$("#add-img-btns").html();

        $("#upload-img-container").append(_imghtml);

		
		var index=$("#upload_img").find(".upload_img_list").length;
		index--;

		if($("#upload-img-container").find(".upload_img_list").length==3){
		 $("#upload_pre").hide();
		}
	  
	 });*/
	/*$("#upload_img").on("click", ".del-img", function() {

		var $this = $(this);
		if ($("#upload_pre").is(":hidden"))
			$("#upload_pre").show();

		var index = $("#upload_img").find(".upload_img_list").index($this.parents(".upload_img_list"));
		$.ajax({
			url: "地址",
			data: {
				index: index
			},
			success: function() {
				alert("删除成功！");
			}
		})
		setTimeout(function() {
			$this.parents(".upload_img_list").remove();
		}, 500);
	});*/
/*--文本框输入文字剩余提示--*/


	/**支付弹窗--*/
	$('#requre_btn').on("click", function() {
		
		var yscroll = $(document).height;
		var screenx = $(window).width();
		var yheight = $(window).height();
		var theight = $(".requrey_box").height();
		$("#loginmodal").css({
			"display":"block",
			"height": yscroll,
			"position":"fixed",
		});
		$("#floatDiv_closeWrap").css("display","block");
        $('html,body').animate({scrollTop: '0px'}, 800);
		var screeny = $(window).height() + yscroll;
		$(".requrey_box").css("display", "block");
		$(".requrey_box").css("top", (theight+40-theight)/2 + "px");
		// var DialogDiv_width=$(".DialogDiv").width();
		//var DialogDiv_height=$(".DialogDiv").height();
		// $(".requrey_box").css("left",(screenx/2-DialogDiv_width/2)+"px")
		// $(".requrey_box").css("top",(screeny/2-DialogDiv_height/2)+"px")
		// $("body").css("overflow","hidden");
	})
	/*-预约维修-我已知晓关闭--*/
	$('.pay_tip .close').on("click", function() {
		$(".pay_tip").fadeOut(300,function(){$("#loginmodal").fadeOut(300);});
		})
	var card_number,card_id,card_code,card_pay_old,last_pay_num;	
    var card_pay_old=$("#pay_old_number").data("val");//未选卡卷需支付金额
	if($(".card_list").find(".selected").length>=1){
         card_number=$(".card_list").find(".selected").find("input").val();//卡卷面额
		 card_id=$(".card_list").find(".selected").find("input").data("val");//卡卷唯一id
		 card_code=$(".card_list").find(".selected").find("input").data("text");//卡卷唯一code
		 money_youhui();
	}
	$(".card_list").on("click", "li", function() {
		var $this = $(this);
		card_number=$this.find("input").val();//卡卷面额
		card_id=$this.find("input").data("val");//卡卷唯一id
		card_code=$this.find("input").data("text");//卡卷唯一id
		if ($this.hasClass("selected")) {
			$this.removeClass("selected").find("input").removeAttr("checked");
			$("#card_pay_num").val(card_pay_old);
	        $("#card_onreadyid").val("");
	        $("#card_onreadycode").val("");
	        $("#payment").val("微信支付(￥"+Number(card_pay_old).toFixed(2)+"元)");
			
		} else {
			$this.addClass("selected").find("input").attr("checked", true);
			$this.siblings("li").removeClass("selected").find("input").removeAttr("checked");
			money_youhui();
		}
		
	});
	
	function money_youhui(){	
	   var jiesuan=card_pay_old-card_number;

       $("#card_pay_num").val(jiesuan);
	   $("#card_onreadyid").val(card_id);
	   $("#card_onreadycode").val(card_code);
	   $("#payment").val("微信支付(￥"+jiesuan.toFixed(2)+"元)");
	}
		/*价格详情弹窗*/
	$('.price_list li a').on("click", function() {
		var $this = $(this);
		
		
		$this.parents().find("a").removeClass("selected");
		$this.addClass("selected");
		var yscroll = $(document).scrollTop();
		var dcheight = $(document).height();
		var screeny = $(document).height();
        $("#loginmodal").css({display: "block",height: $(document).height()+yscroll});
		$(".price_details").css("display", "block");
		$(".price_details").css("top", yscroll + 10 + "px");
	})
	$('.price_details .sub_btn').on("click", function() {
		$("#loginmodal").css({
			display: "none"
		});
		$(".price_details").css("display", "none");
		$('.price_list li a').removeClass("selected");
	}) 
	 

	
	$('#floatDiv_closeWrap').on("click", function() {
		$("#loginmodal,#loginmodal1").css({
			display: "none"
		});
		$(".requrey_box,.service_ui").fadeOut(300);
		$(this).fadeOut(200);
	})



});
function words_deal(textid,maxnum,text_tip_info)
{  
   var curLength=$(textid).val().length;
   if(curLength>maxnum)
   {
        var num=$(textid).val().substr(0,maxnum);
        $(textid).val(num);
   }
   else
   {
        $("#"+text_tip_info).text(maxnum-$(textid).val().length);
   }
}


function menv_footer(object,num)
{
	var $this=$(object);
	$this.find(".navmenu:eq("+num+")").addClass("active").siblings().remove("active");
	
}


 //弹出框
        var ShowModal = {
            show: function (opts) {
                var opts = $.extend({
                    modal: "#modal",
                    clickli: "li",
                    closeid: "#modal-close",
                    callback: {},
                }, opts);
                if (opts.modal != "" && $(opts.modal).length > 0) {
					var yscroll = $(document).scrollTop();
                    var $modal = $(opts.modal), $container = $modal.find(".modal-container");
					$modal.find(".modal-mask").css({"height":$(window).height()+yscroll});
                    $modal.css({ "height": $(window).height() });
                    $container.css({ "margin-top": ($(window).height() - $container.height()) / 2 - 100 });
                    $modal.css({ "visibility": "visible", "display": "none" }).fadeIn(100);
                    //关闭
                    $(opts.closeid).on("click", function () {
                        $modal.fadeOut(100);
                    });
                    //选择
                    $container.on("click", "li a", function () {
                        var $this = $(this);
                        if ($this.data("val") != undefined && $this.data("val") != null) {
                            if (typeof opts.callback == "function") {
                                opts.callback($this.data("val"), $this.data("text"));
                                $(opts.closeid).trigger("click");
                            }

                        }
                    })
                }
            }

        };
 
 
//显示提示
var g_tips = false;
function showTips(text,cb) {
	if (g_tips) {
		window.clearTimeout(g_tips);
		$(".showtips").remove();
		g_tips = false;
	}
	var newTips = $("<div>");
	$("body").append(newTips);
	newTips.addClass('showtips');
	newTips.text(text);
	window.setTimeout(function() {
		newTips.addClass('active');
	}, 10);
	g_tips = window.setTimeout(function() {
		$(".showtips").remove();
		if(cb){
			cb();
		}
	}, 3000);
}

//验证码倒计时
	function settime(obj,input,callback) {
    var time = 60, $submit = $(obj),$input=$(input), timer = null;
    $submit.on("click", function () {
		
		if($input.val()==""||$input.val()==null)
		{
		   showTips("手机号不能为空哦！","");
		   return;
		}
		if(!checkMobile($input.val()))
		{
		   showTips("手机只能为11位的数字哦！","")
		   return;
		}
        else{
		var $this = $(this);
        if (!$this.attr("disabled")) { 
		 if(callback!=undefined&&typeof callback=="function")
		 {
		       callback();	 
		 } 
            
	
			timer = setInterval(function () {
	             if (time == 0) {
	                 $this.removeAttr("disabled").val("获取验证码");
	                 time = 60;
	                 clearInterval(timer);
	             }
	             else {
	                 $this.attr("disabled", true).val("重新发送(" + time + ")");
	                 time--;
	             }
	         }, 1000)
		   } 

		}
		
		
    });
};

//+1 动画

function ToGoodOrBad_animate(_this){
 var score_html="+1";
 var $this=$("<div id='goodbad_addscore'>"+score_html+"</div>").appendTo($(_this));
 $this.css("position","absolute");
 $this.css("font-size","0.7rem");	
 $this.css("font-family","Arial, Helvetica, sans-serif");	
 $this.css("text-align","center");	
 $this.css("line-height","25px");	
 $this.css("color","#fe0012");
 $this.animate({opacity:"hide",top:-40},1500,function(){$this.remove(); });	  

 
}