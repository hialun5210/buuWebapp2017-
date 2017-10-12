//工人微信门户公共方法
var WorkerProgram = (function () {
    //点击浮动左边浮动出来
    function WorkerProgramAdd(fopts) {
        var fopts = $.extend({status :"", floatid: "", zIndex: 100, closeid: "", clickid: "", btnsubmitid: "", btnsubmitcall: "", clickcall: "", editclickcall: "", closecall: "" }, fopts);
        var floatid = fopts.floatid, status = fopts.status, closeid = fopts.closeid, clickid = fopts.clickid, editclickcall=fopts.editclickcall, btnsubmitid = fopts.btnsubmitid, btnsubmitcall = fopts.btnsubmitcall, clickcall = fopts.clickcall, closecall = fopts.closecall;
        var _wwidth = $(window).width(),_scorll=$(window).scrollTop(); _wheight = $(window).height();
        $(floatid).css({
            "height": _wheight+_scorll,
            "right": "-100%",
            "top": 0,
            "display": "none",
            "position": "absolute",
            "z-index": fopts.zIndex
        });
		
        $(window).resize(function () {
            var _wwidth = $(window).width(), _wheight = $(window).height();
            $(floatid).css({
                "width": _wwidth,
                "height": _wheight
            });
        });
        //点击
		var weixiudalei,weixiuxiaolei,weixiuxiangmu,checkResult,checkMaterResult,shuliang,weixiujiage,onlyprice,programid,danwei,danwei_info,cailiaoname,cailiaoprice,cailiao_num,checkEarnResult,checkOthersResult;
		//三级菜单唯一id值	
		var $this;
        $(document).on("click", clickid, function () {
		$('html,body').animate({scrollTop: '0px'}, 800);
        	
		    weixiudalei=$(fopts.floatid).find("select[name=weixiudalei]");
			weixiuxiaolei=$(fopts.floatid).find("select[name=weixiuxiaolei]");
			weixiuxiangmu=$(fopts.floatid).find("select[name=weixiuxiangmu]");
			checkResult=$(fopts.floatid).find("input[name=checkResult]");
			checkMaterResult=$(fopts.floatid).find("input[name=checkMaterResult]");
			checkEarnResult=$(fopts.floatid).find("input[name=checkEarnResult]");
			checkOthersResult=$(fopts.floatid).find("input[name=checkOthersResult]");
			weixiujiage=$(fopts.floatid).find("input[name=weixiujiage]");
			onlyprice=$(fopts.floatid).find("input[name=onlyprice]");
			cailiaoname=$(fopts.floatid).find("input[name=cailiao_name]");
			cailiaoprice=$(fopts.floatid).find("input[name=cailiao_price]");
			cailiao_num=$(fopts.floatid).find("input[name=cailiao_num]");
			programid =$(fopts.floatid).find("select[name=weixiuxiangmu]").find("option:selected").data("val");
			$(fopts.floatid).find("select[name=weixiuxiangmu]").change(function(){
		     programid=$(this).find("option:selected").data("val"); 
			})
			danwei_info=$(fopts.floatid).find("span.danwei_info");
			danwei=$(fopts.floatid).find("rem.danwei");
		

			
			$this=$(this).data("val");
			$('body').append('<div class="layerbox"></div>');
            $(floatid).stop(true, true).animate({ "opacity": "show", "right": 0,"height":_wheight+_scorll });
			
			switch (status) {
			
			case 'edit_program':	
			
            if (clickcall != "" && typeof (clickcall) == "function") {
                clickcall(weixiudalei,weixiuxiaolei,weixiuxiangmu,shuliang,weixiujiage,onlyprice,danwei_info,danwei,$this);
            }
			
				break;	
			
			case 'edit_cailiao':
				
			  if (clickcall != "" && typeof (clickcall) == "function") {
                clickcall($this);
            }
			
				break;	
			}
						
           
        });
		 //点击
		 var numindex=0;
        $(document).on("click", btnsubmitid, function () {        	
			var pattern ="/[^0-9]/g";
            switch (fopts.status) {
			case 'add_program':				
			 if(checkResult.val().trim()=="0")
			 {			     
				 return;
		     }
			 else{
				  $(fopts.closeid).trigger("click");	
			 
			 if (btnsubmitcall != "" && typeof (btnsubmitcall) == "function") {
               btnsubmitcall(weixiudalei.val(),weixiuxiaolei.val(),weixiuxiangmu.val(),checkResult.val(),weixiujiage.val(),onlyprice.val(),danwei_info.text(),danwei.text(),programid); 
			 }
			    
			 }
			 break;
			
			case 'edit_program':	
			 if (editclickcall != "" && typeof (editclickcall) == "function") {
               editclickcall($this);
			 }
				break;	
			case 'add_cailiao':				
			if(checkMaterResult.val().trim()=="0")
			 {			     
				 return;
		     }
			 else{
			 if (btnsubmitcall != "" && typeof (btnsubmitcall) == "function") {
			   numindex=numindex+1;
               btnsubmitcall(cailiaoname.val(),cailiaoprice.val(),cailiao_num.val(),numindex);
			 }
			 }
				break;
			case 'add_cyj':				
				if(checkEarnResult.val().trim()=="0")
				 {			     
					 return;
			     }
				 else{
				 if (btnsubmitcall != "" && typeof (btnsubmitcall) == "function") {
				   numindex=numindex+1;
	               btnsubmitcall(numindex);
				 }
				 }
					break;
			case 'add_qita':				
				if(checkOthersResult.val().trim()=="0")
				 {			     
					 return;
			     }
				 else{
				 if (btnsubmitcall != "" && typeof (btnsubmitcall) == "function") {		  
					 numindex=numindex+1;
		             btnsubmitcall(numindex);
				 }
				 }
					break;
			case 'edit_cailiao':
			if (editclickcall != "" && typeof (editclickcall) == "function") {
               editclickcall($this);
			}
				break;
			}
			
			  $(fopts.closeid).trigger("click");	      
           
			
        });
        //关闭
        $(document).off("click", closeid).on("click", closeid, function () {
            CloseFloat(floatid);
			$(".layerbox").fadeOut(1000,function(){$(this).remove();});
            if (closecall != "" && typeof (closecall) == "function") {
                closecall();
            }
        });
    }

    //关闭浮动窗
    function CloseFloat(floatid) {
        $(floatid).stop(true, true).animate({ "opacity": "hide", "right": "-100%" });
    }

    return {
        WorkerProgramAdd: function (fopts) {
            WorkerProgramAdd(fopts);
        },
        CloseFloat: function (floatid) {
            CloseFloat(floatid);
        }
    }
})();

