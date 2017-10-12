// JavaScript Document
var Map=function(){ 
    // 百度地图API功能
	var uniqueInstance;
    var map = new BMap.Map("bdMapBox");
    var nowCity = new BMap.LocalCity();
   
     nowCity.get(bdGetPosition);
  	 function bdGetPosition(result){
       var thisname = result.name; //当前的城市名
	   return thisname;
	 }
	return {
	    bdGetPosition:function(){
		 return  bdGetPosition();  
	  }	
		
	}
}