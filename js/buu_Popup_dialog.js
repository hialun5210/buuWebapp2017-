//工人Tab选择预约上门时间
(function($) {
	$.SelectReservationTime = {
		isautoClose:true,
		append : false, 
		mainid : " ",//弹窗id
		datepick:function(day){//day 参数0,1 代表今天，明天
          //获取年月日
	      var today = new Date();    
          var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
          today.setTime(targetday_milliseconds); //注意，这行是关键代码    
          var tYear = today.getFullYear();  
          var tMonth = today.getMonth();  
          var tDate = today.getDate();  
          tMonth = $.SelectReservationTime.doHandleMonth(tMonth + 1);  
          tDate = $.SelectReservationTime.doHandleMonth(tDate); 
		  return tYear+"-"+tMonth+"-"+tDate;
		  //alert(tYear+"-"+tMonth+"-"+tDate);
		},
		doHandleMonth:function(month){ //1-9月自动在前加0如 09 月
		  var m = month;  
          if(month.toString().length == 1){  
             m = "0" + month;  
          }  
          return m;  
				
		},
		datetime: function(show_body_id, callback) {
			
			$.SelectReservationTime._show(show_body_id,true,'datetime',function(result,value) {
				if (callback)
					callback(result,value);
			});
		},

		normal :function(show_body_id,autoClose, callback) {
			var isClose = autoClose == null ? "true" : autoClose ;
			$.SelectReservationTime._show(show_body_id,isClose,'normal',function(result,value,$this) {
				if (callback)
					callback(result,value,$this);
			});
		},
		
		selectMores :function(show_body_id, callback) {
			$.SelectReservationTime._show(show_body_id,true,'selectMores',function(result,value,$this) {
				if (callback)
					callback(result,value,$this);
			});
		},


		_show : function(show_body_id,isautoclose,type,callback) {
		
			$.SelectReservationTime.mainid=show_body_id;

		    $("#"+show_body_id).show();
			
			$.SelectReservationTime._overlay('show');
			$('body').css({height:"100%","overflow":"hidden"});
			
/*			var html = '<div class="leftPopup bodyform "  style="z-index: 999999;" id="leftPopup" ><div class="swipeLeft" style="overflow: hidden;" id="swipeLeft" >';
			html += '</div></div>';
			$("BODY").append(html);*/
			
            
			
			
			
			
			 setTimeout(function (){
                 $("#"+show_body_id+" .swipeLeft").addClass("swipeLeft-block")
            }, 100);
			
			
			
				
			/*$("#swipeLeft").append($("#"+show_body_id).html());*/
		
			
			$.SelectReservationTime._maintainPosition(true);
			
			
			
			
			
			$("#leftmask").on("click",function(){
			
                 $.SelectReservationTime._hide();
					
			})
			
			switch (type) {
			    case 'datetime':
				if($("#date_time").val()==""){
                $("#date_time").val($.SelectReservationTime.datepick(0));//给隐藏文本域填充当天日期
				}
			    $("#"+show_body_id+" .Popup_title").on("click","a",function(){
					var $this=$(this);
					var $index =  $("#"+show_body_id+" .Popup_title").find("a").index($this);
					if($this.hasClass("active")){
						
					}
					else{
						$this.addClass("active").siblings(this).removeClass("active");
						$("#date_time").val($.SelectReservationTime.datepick($index));
					}
				})
				
				
				$("#"+show_body_id+" .swipeLeft").on("click","ul li a",function(){
					
					
				var $this=$(this);
				var select_date1=$this.data("value");
				var selectDateStr = $("#date_time").val()+" "+select_date1+":00";
    	        var strArray=selectDateStr.split(" "); 
    	        var strDate=strArray[0].split("-"); 
             	var strTime=strArray[1].split(":"); 
    	        var selectDateTime=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2],strTime[0],strTime[1],strTime[2]) 
		        var currentTime = new Date();
				 //console.log(currentTime+":"+selectDateTime);
		        if(currentTime>selectDateTime){
			       showTips("您选择的预约时间早于当前时间","");
			    return false;
		        }else{
			       callback(true,$this.data("value"));
				   $.SelectReservationTime._hide();
		        }
				
		})

				
			break;
			    case 'normal':
			
				//点击选择list数据，在前台function里面进行判断
			$("#"+show_body_id+" .swipeLeft").on("click","ul li a",function(){
						
					var $this=$(this);
					callback(true,$this.data("value"),$this);
					if(isautoclose){$.SelectReservationTime._hide();}
					
			});
			
			break;
			}
			
		},

		_hide : function() {
			
			
			$.SelectReservationTime._overlay('hide');
			$.SelectReservationTime._maintainPosition(false);
			$('body').css({height:"auto","overflow":"auto"});
			
		},

		_overlay : function(status) {
			switch (status) {
			case 'show':
				
				$("BODY").append('<div class="leftmask leftmaskcondition" style="z-index: 998;" id="leftmask" ></div>');
				break;
			case 'hide':
			   
				
			
				 $("#"+$.SelectReservationTime.mainid+" .swipeLeft").removeClass("swipeLeft-block");
				 setTimeout(function (){
                      $("#"+$.SelectReservationTime.mainid).hide();
				      $("#leftmask").remove();
                 }, 400);
				
				break;
			}
		},

		_maintainPosition : function(status) {
			if ($.SelectReservationTime.repositionOnResize) {
				switch (status) {
				case true:
					$(window).bind('resize', function() {
						
					});
					break;
				case false:
					$(window).unbind('resize');
					break;
				}
			}
		}

	};

	Selecttime = function(show_body_id, callback) {
		$.SelectReservationTime.datetime(show_body_id,callback);
	};

	Snormal = function(show_body_id,callback,isclose){
		var autoclose = true;
		if(isclose==null){
			autoclose = true
		}
		else{
			autoclose = isclose;
		}
		$.SelectReservationTime.normal(show_body_id,autoclose, callback);
	};

})(jQuery);