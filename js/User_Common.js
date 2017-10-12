//des:前台用户公用 
//author:海纶
//time:2016-9-9
var userCommonNew={
	/*评价内容选择的评分星星数不同而显示的相应描述*/
	suggest_tages:[],//把选择的评价标签存放到数组
	$index:-1,//点击的第几个星星(-1代表没有选择星星)
	stars_info:"",//选择星星提示语
	start_suggest_info:"",//选择建议提示语
	evaluation_stars_des:[
	{"stars_info":"很糟糕","start_suggest":"哪里出错了？"},
	{"stars_info":"差","start_suggest":"哪里出错了？"},
	{"stars_info":"一般","start_suggest":"哪里出错了？"},
	{"stars_info":"好","start_suggest":"怎么做会更好？"},
	{"stars_info":"很好","start_suggest":"哪些方面做的很好？"}
	],
	evaluation_select_stars:function(){ //点击选择星星
       
	   $(".stars").on("click","a",function(){
		  
          var $this=$(this);
		  userCommonNew.$index=$(".stars").find("a").index($this);//点击的第几颗星星
		  for(var i=0;i<5;i++){
			if(i<=userCommonNew.$index){
				$(".stars").find('a').eq(i).addClass("active"); 
			 }
			 else{
				$(".stars").find("a").eq(i).removeClass("active");
			}			  
		  }
		  userCommonNew.stars_info=userCommonNew.evaluation_stars_des[userCommonNew.$index]["stars_info"];
		  $("#stars_info").html(userCommonNew.stars_info);
		  userCommonNew.start_suggest_info=userCommonNew.evaluation_stars_des[userCommonNew.$index]["start_suggest"];
		  $("#start_suggest_info").html(userCommonNew.start_suggest_info);
		  })
	   
	   
	},
	//选择评价标签
	evaluation_suggest_tags_select:function(){
		 $("#stars_tag_a").on("click","a",function(){
          var $this=$(this);
		  $index=$("#stars_tag_a").find("a").index($this);//点击的第几个标签
		  if($this.hasClass("active"))
		  {
			     $this.removeClass("active"); 
				 for(var i=0;i<userCommonNew.suggest_tages.length;i++){
				 if(userCommonNew.suggest_tages[i]["id"]==$index+1)
				 userCommonNew.suggest_tages.splice(i,1);
				 }
				
		  }
		  else
		  {
		       
				
				 $("#stars_tag_a").find("a").eq($index).addClass("active");
				
				 userCommonNew.suggest_tages.push({"id":$index+1,"name":$this.html()});
		  }
		  })
	},
	evaluation_show:function(callback){
		
		
	},
	evaluation_submit:function(callback){ //提交数据
		
		callback(userCommonNew.$index+1,userCommonNew.stars_info,userCommonNew.start_suggest_info,userCommonNew.suggest_tages);
	}
}

$(function(){
	
		userCommonNew.evaluation_select_stars();
	    userCommonNew.evaluation_suggest_tags_select();
	
        //提交评价【v2.9】
	//a:选择的星星个数，b:选择星星提示的文字，c:提示语选择建议标签
	//d:json格式存放的选择的建议标签（多选）
	//格式：[{"id":"标签的data-val","tag_name":"标签显示的文字"}]
	
})

