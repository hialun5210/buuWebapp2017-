$(function () {
   $("#date_rili").html('<div class="cui-content"><div class="calendar"><div class="main"><div class="mouth"><SPAN id="curYear">2012</SPAN>年 <span class="blue"><select id="month"></select></span></div><div class="weeks"><div class="week blue">周日</div><div class="week">周一</div><div class="week">周二</div><div class="week">周三</div><div class="week">周四</div><div class="week">周五</div><div class="week blue">周六</div></div><div class="days" id="days"><div class="day"><div class="other">26</div></div><div class="day"><div class="other">27</div></div><div class="day"><div class="other">28</div></div><div class="day"><div class="other">29</div></div><div class="day"><div class="other">30</div></div><div class="day"><div class="other">31</div></div><div class="day"><div class="past">1</div></div><div class="day"><div class="past">2</div></div><div class="day"><div class="past">3</div></div><div class="day"><div class="past">4</div></div><div class="day"><div class="past">5</div></div><div class="day"><div class="past">6</div></div><div class="day"><div class="past">7</div></div><div class="day"><div class="past">8</div></div><div class="day"><div class="past">9</div></div><div class="day"><div class="past">10</div></div><div class="day"><div class="cur">11</div></div><div class="day"><div class="future">12</div></div><div class="day"><div class="future">13</div></div><div class="day"><div class="future">14</div></div><div class="day"><div class="future">15</div></div><div class="day"><div class="future">16</div></div><div class="day"><div class="future">17</div></div><div class="day"><div class="future">18</div></div><div class="day"><div class="future">19</div></div><div class="day"><div class="future">20</div></div><div class="day"><div class="future">21</div></div><div class="day"><div class="future">22</div></div><div class="day"><div class="future">23</div></div><div class="day"><div class="future">24</div></div><div class="day"><div class="future">25</div></div><div class="day"><div class="future">26</div></div><div class="day"><div class="future">27</div></div><div class="day"><div class="future">28</div></div><div class="day"><div class="future">29</div></div><div class="day"><div class="future">30</div></div><div class="day"><div class="other">1</div></div><div class="day"><div class="other">2</div></div><div class="day"><div class="other">3</div></div><div class="day"><div class="other">4</div></div><div class="day"><div class="other">5</div></div><div class="day"><div class="other">6</div></div></div></div><div class="date_area"><p><a href="javascript:;" >07:00-9:00</a><a href="javascript:;" class="selected" >09:00-11:00</a><a href="javascript:;">11:00-13:00</a></p><p><a href="javascript:;">13:00-15:00</a><a href="javascript:;">15:00-17:00</a><a href="javascript:;">17:00-19:00</a></p><a href="javascript:;" style="width:31% !important;display:block;margin-top:8px;">19:00-21:00</a></div><div class="btns"><div id="btnSure" class="button">确 定</div>&nbsp;&nbsp;<div id="btnCancel" class="button" style="float:right;background:#ccc;">关 闭</div><input type="hidden" id="dateBooking" /><input type="hidden" id="date_info" value="09:00-11:00" /></div></div></div></div>')
     
    
	    wechatCommon.FloatShow({
        floatid: "#date_rili",
        zIndex: 101,
        closeid: "#btnCancel,#selectdateBack",
        clickid: "#select_date_pre",
        clickcall: "",
		closecall: ""

 }) 

    //获取当前月的天数
    function dayNumOfMonth(Year, Month) {
        var d = new Date(Year, Month + 1, 0);
        return d.getDate();//getDay
    }

    //获取某天的星期几
    function getWeekOfMonth(y, m) {
        var d = new Date(y, m, 1);
        return d.getDay();
    }

    var myDate = new Date();
    var curYear = myDate.getFullYear();
    var curMonth = myDate.getMonth();//当前月(0-11)
    var curDay = myDate.getDate();//当前日期号码
    var curWeek = getWeekOfMonth(curYear,curMonth);
    var curM = {
        year: curYear,
        month: curMonth,
        day: curDay,
        week: curWeek,
        days: dayNumOfMonth(curYear, curMonth),
        curDay: curDay
    }
	
    //下月
    var nextDate = new Date();///
	nextDate.setDate(1);
    nextDate.setMonth(curMonth+1);//当前月(0-11)
    var nextYear = nextDate.getFullYear();
    var nextMonth = nextDate.getMonth();	
    var nextDay = nextDate.getDate();
    var nextWeek = getWeekOfMonth(nextYear,nextMonth);//
    var nextM = {
        year: nextYear,
        month: nextMonth,
        day: nextDay,
        week: nextWeek,
        days: dayNumOfMonth(nextYear, nextMonth),
        curDay: -1
    }

    var option = {
        year: curYear,
        month: curMonth,
        day: curDay,
        apm: "上午"
    }
///设置年、月
    $("#curYear").html(curYear);
    $("#month").append("<option value='0' selected>" + (curMonth + 1) + "月</option>");  //添加当前月option
    
	
	
	
for(var j=1;j<=5;j++){
	
	if((nextMonth+1)>12){nextMonth=0;}
    $("#month").append("<option value='"+j+"'>" + (nextMonth + 1) + "月</option>");  //添加下月月option
	nextMonth=nextMonth+1;
	
}
    $("#days").on("click", ".future", function () {
        $("#days").find(".cur").addClass("future").removeClass("cur");
        $(this).removeClass("future");
        $(this).addClass("cur");
        var d = $(this).attr("data-day").split("-");
        option.year = d[0];
        option.month = d[1] - 1;
        option.day = d[2];
        $("#dateBooking").val($(this).attr("data-day"));        
    })
	 $(".date_area").on("click", "a", function () {
        $(".date_area").find(".selected").removeClass("selected");
        $(this).addClass("selected");
        $("#date_info").val($(this).text());        
    })
    //点击月份选择事件
    $("#month").change(function () {
            var value = jQuery("#month").val();
            initDate(value);
            var dataLists=[].slice.call(document.querySelectorAll('.day div[data-day]'));
            dataLists.forEach(function(value,index){
            	if(value.getAttribute("data-day")==GetDateStr(0)){
            		value.innerHTML="今天";
            	}
            	if(value.getAttribute("data-day")==GetDateStr(1)){
            		value.innerHTML="明天";
            	}
            	if(value.getAttribute("data-day")==GetDateStr(2)){
            		value.innerHTML="后天";
            	}
            })
        }
		
    )
    //提交选择的日期数据
    $("#btnSure").click(function() {
    	var yeardate=$("#dateBooking").val()
    	var yArr=yeardate.split("-"); 
    	var year = yArr[0];
    	var month = yArr[1];
    	var day = yArr[2];
    	if(day<10){
    		day="0"+day;
    	}
    	if(month<10){
    		month="0"+month;
    	}
    	var yMd = year+"-"+month+"-"+day;
		var datetime=$("#date_info").val();
		var sArr=datetime.split("-");    
    	$("#select_date").text(yMd);
		$("#select_date1").text(sArr[0]);
		$("#select_date2").text(sArr[1]);
    	$("#select_date_pre").html(yMd+" "+$("#date_info").val());
    	//时间转换 String to date
    	//var s = "2005-12-15 09:41:30"; 
    	//var d = new Date(Date.parse(s.replace(/-/g, "/"))); 
    	var selectDateStr = $("#select_date").text()+" "+$("#select_date1").text()+":00"
    	var strArray=selectDateStr.split(" "); 
    	var strDate=strArray[0].split("-"); 
    	var strTime=strArray[1].split(":"); 
    	var selectDateTime=new Date(strDate[0],(strDate[1]-parseInt(1)),strDate[2],strTime[0],strTime[1],strTime[2]) 
		var currentTime = new Date();
		if(currentTime>selectDateTime){
			showTips("您选择的维修时间早于当前时间","");
			return false;
		}else{
			$("#btnCancel").trigger("click");
		}
		
    	
    });
    
    
    //取消
/*    $("#btnCancel").click(function() {    
    	cui.pageBack();
    });*/
     
    function initDate(value) {
        var selectM;
        if (value == "0") {
            $("#curYear").html(curYear);
            selectM = curM;
        } else {
           
						
			
			
	var nextDate1 = new Date();///
	nextDate1.setDate(1);
    nextDate1.setMonth(curMonth + parseInt(value));
	console.log(nextDate1+":"+curMonth);
    var nextYear1 = nextDate1.getFullYear();
    var nextMonth1 = nextDate1.getMonth();
    var nextDay1 = nextDate1.getDate();

    var nextWeek1 = getWeekOfMonth(nextYear1,nextMonth1);//
    var nextM1 = {
        year: nextYear1,
        month: nextMonth1,
        day: nextDay1,
        week: nextWeek1,
        days: dayNumOfMonth(nextYear1, nextMonth1),
        curDay: -1
    }








		$("#curYear").html(nextYear1);
		selectM = nextM1;
        }
        var htmlStr = "";
        var d = 0;
        for (var i = 0; i < 42; i++) {
            if (i < selectM.week) {
               htmlStr = htmlStr + "<div class='day'><div class='other'></div></div>";
            } else {
                d++;
                if (d <= selectM.days) {
                    if (selectM.curDay != -1) {
                        if (d < selectM.curDay) {
                            htmlStr = htmlStr + "<div class='day'><div class='past'>" + d + "</div></div>";
                        } else {
                            if (option.year == selectM.year && option.month == selectM.month && option.day == d) {
                            	var dateVal = selectM.year + "-" + (selectM.month + 1) + "-" + d;
                            	$("#dateBooking").val(dateVal);
                            	$("#timeArea").val(option.apm);
                                htmlStr = htmlStr + "<div class='day'><div class='cur' data-day='" + dateVal + "'>" + d + "</div></div>";                               
                            } else {
                                htmlStr = htmlStr + "<div class='day'><div class='future' data-day='" + selectM.year + "-" + (selectM.month + 1) + "-" + d + "'>" + d + "</div></div>";
                            }
                        }
                    } else {
                        if (option.year == selectM.year && option.month == selectM.month && option.day == d) {
                            htmlStr = htmlStr + "<div class='day'><div class='cur' data-day='" + selectM.year + "-" + (selectM.month + 1) + "-" + d + "'>" + d + "</div></div>";
                        } else {
                            htmlStr = htmlStr + "<div class='day'><div class='future' data-day='" + selectM.year + "-" + (selectM.month + 1) + "-" + d + "'>" + d + "</div></div>";
                        }
                    }
                }
                else {
                    htmlStr = htmlStr + "<div class='day'><div class='other'></div></div>";
                }
            }
        }
        $("#days").html(htmlStr);
    }

    initDate("0");
    
    
    
    
    
    function GetDateStr(AddDayCount) 
    { 
       var dd = new Date(); 
       dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
       var y = dd.getFullYear(); 
       var m = dd.getMonth()+1;//获取当前月份的日期 
       var d = dd.getDate(); 
       return y+"-"+m+"-"+d; 
    } 
    
    
    var dataLists=[].slice.call(document.querySelectorAll('.day div[data-day]'));
    dataLists.forEach(function(value,index){
    	if(value.getAttribute("data-day")==GetDateStr(0)){
    		value.innerHTML="今天";
    	}
    	if(value.getAttribute("data-day")==GetDateStr(1)){
    		value.innerHTML="明天";
    	}
    	if(value.getAttribute("data-day")==GetDateStr(2)){
    		value.innerHTML="后天";
    	}
    })
    
    

    
    

}
)