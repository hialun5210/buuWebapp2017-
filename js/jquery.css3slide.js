!function(a){function b(){}var c={};c=b.prototype={dragload:function(b){var c,d,e,f,h,i,j,k,l,m,n,o,p,q,r,s;b=a.extend({scrollid:"",container:"",dragtype:"updown",dragtop:30,userTransform:!0,useElastic:!0,reload:function(){},loadmore:function(){},propertydata:"index",propertywd:""},b),k=0,l=0,m="translate3d(0px,0px,0px) scale(1)",n=0,o=this,p=!1,b.userTransform?a(b.container).addClass("css-animate"):(q=a(b.container).css("position").toLowerCase(),("relative"!=q||"absolute"!=q||"fixed"!=q)&&a(b.container).addClass("beRelative"),k=a(b.container).position().left,l=a(b.container).position().top),r=b.propertywd,""==r&&(r=-1*a(window).width()),s="",s="leftright"==b.dragtype?"translateX(":"translateY(",a(b.container).on("touchstart",function(e){e.preventDefault(),c=e.originalEvent.targetTouches[0].clientX,d=e.originalEvent.targetTouches[0].clientY;var f=a(b.container).data(b.propertydata);(void 0==f||""==f)&&(f=0),n=f*r,m=s+n+"px)"}).on("touchmove",function(g){if(g.preventDefault(),e=g.originalEvent.targetTouches[0].clientX,f=g.originalEvent.targetTouches[0].clientY,i=d-f,j=c-e,"updown"==b.dragtype){if(i>0){var m=a(b.container).height()-a(b.scrollid).height();h=a(b.scrollid).offset().top-m,p=i>=b.dragtop}else h=a(b.scrollid).offset().top,p=-i>=b.dragtop;b.userTransform?o.setCss3prop(b.container,"transform","translateY("+(-i+n)+"px)"):a(b.container).stop(!0,!0).css({top:-i+l})}else p=j>0?j>=b.dragtop:-j>=b.dragtop,b.userTransform?o.setCss3prop(b.container,"transform","translateX("+(-j+n)+"px)"):setTimeout(function(){a(b.container).stop(!0,!0).css({left:-j+k})},60)}).on("touchend",function(){if("updown"==b.dragtype){var d=a(b.container).offset().top;i>0?p&&h-b.dragtop>=d?"function"==typeof b.loadmore&&b.loadmore():b.userTransform?o.setCss3prop(b.container,"transform",m):setTimeout(function(){a(b.container).stop(!0,!0).css({left:k,top:l})},60):p&&h+b.dragtop<=d?"function"==typeof b.reload&&b.reload():b.userTransform?o.setCss3prop(b.container,"transform",m):setTimeout(function(){a(b.container).stop(!0,!0).css({left:k,top:l})},500/60)}else j>0?p?"function"==typeof b.loadmore&&b.loadmore():b.userTransform?o.setCss3prop(b.container,"transform",m):setTimeout(function(){a(b.container).stop(!0,!0).css({left:k,top:l})},500/60):p?"function"==typeof b.reload&&b.reload():b.userTransform?o.setCss3prop(b.container,"transform",m):setTimeout(function(){a(b.container).stop(!0,!0).css({left:k,top:l})},500/60);p=!1})},setCss3prop:function(a,b,c){var d,e,f;for($container=this.getid(a),d=["","-ms-","-moz-","-webkit-","-0-"],e=d.length-1;e>=0;e--)f=d[e]+b,$container.style[f]=c},getid:function(a){return $container=document.querySelector(a)},cssAnimate:function(b){var c,d,e;b=a.extend({container:"",slidetype:"add",slideclass:"",scale:"1",x:0,y:0,speed:null,callback:function(){}},b),c=a(b.container),c.hasClass("css-animate")||c.addClass("css-animate"),d=300,""!=b.slideclass?(b.slideclass="slide"+b.slideclass,"add"==b.slidetype?a(b.container).addClass(b.slideclass):a(b.container).removeClass(b.slideclass)):(e="translate3d("+b.x+"px,"+b.y+"px,0px)",null!=b.scale&&(e=e+" scale("+b.scale+")"),this.setCss3prop(b.container,"transform",e),null!=b.speed&&this.setCss3prop(b.container,"transition-duration",b.speed+"ms")),null!=c.csstimer&&clearTimeout(c.csstimer),c.cssAnimate=setTimeout(function(){"function"==typeof b.callback&&b.callback()},d)},$winwd:a(window).width(),slide:function(b){function m(a){l=!0;var g=-1*a*i;c.cssAnimate({container:b.container,x:g,speed:b.speed,callback:function(){var g=!1;a>=f-1&&(a=1,g=!0),0>=a&&(a=f-2,g=!0),g?(l=!0,c.cssAnimate({container:b.container,x:-1*a*i,speed:0,callback:function(){l=!1,e.eq(a).addClass("active").siblings().removeClass("active"),d.data("index",a),"function"==typeof b.callback&&b.callback(a-1)}})):(l=!1,d.data("index",a),e.eq(a).addClass("active").siblings().removeClass("active"),"function"==typeof b.callback&&b.callback(a-1))}})}function n(a,b){if(!l){var c=d.data("index");(void 0==c||""==c)&&(c=1),c=parseInt(c),b||("left"==a?c--:c++),m(c)}}var c,d,e,f,g,h,i,j,k,l,o;b=a.extend({leftbtn:"",rightbtn:"",container:"",swiper:"",childtag:"img",callback:{},speed:300,autoslide:!1,slidetime:2e3,slideposition:"right",touchslide:!0},b||{}),c=this,""!=b.container&&(d=a(b.container),e=d.find(b.childtag),f=e.length,g=a(b.leftbtn),h=a(b.rightbtn),i=c.$winwd,e.css({width:i}),f>1&&(j=e.eq(0).clone(),k=e.eq(f-1).clone(),d.prepend(k).append(j),e=d.find(b.childtag),f+=2,d.css({width:f*i}),l=!1,n(b.slideposition,!0),g.length&&g.on("click",function(){n("left")}),h.length&&h.on("click",function(){n("right")}),b.touchslide&&c.dragload({scrollid:b.swiper,container:b.container,dragtype:"leftright",dragtop:50,userTransform:!0,useElastic:!0,reload:function(){n("left",!1)},loadmore:function(){n("right",!1)}})),b.autoslide&&(o=0,""!=b.slidetime&&(o+=parseInt(b.slidetime)),null!=b.speed&&""!=b.speed&&(o+=parseInt(b.speed)),setInterval(function(){n(b.slideposition)},o)))}},window.guofpslide=c=new b}(jQuery);