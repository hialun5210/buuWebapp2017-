(function($) {
	$.alerts = {
		verticalOffset : -75, 
		horizontalOffset : 0,
		repositionOnResize : true, 
		overlayOpacity : 0.3, 
		overlayColor : '#333', 
		draggable : true, 
		okButton : '&nbsp;确定&nbsp;', 
		cancelButton : '&nbsp;取消&nbsp;', 
		dialogClass : null, 

		alert : function(message, title, callback, btnText) {
			if (title == null)
				title = '';
			$.alerts._show(title, message, null, 'alert', btnText, null, function(result) {
				if (callback)
					callback(result);
			});
		},

		confirm : function(message, title, callback, lBtnText, rBtnText) {
			if (title == null)
				title = '';
			$.alerts._show(title, message, null, 'confirm', lBtnText, rBtnText, function(result) {
				if (callback)
					callback(result);
			});
		},

		_show : function(title, msg, value, type, lBtnText, rBtnText, callback) {
			if(null == lBtnText || lBtnText.length == 0){
				lBtnText = $.alerts.okButton;
			}
			if(null == rBtnText || rBtnText.length == 0){
				rBtnText = $.alerts.cancelButton;
			}
			$.alerts._hide();
			$.alerts._overlay('show');
			var html = '<div id="popup_container" class="modal"><div class="modal-dialog"><div class="modal-content">';
			if(title == null || title.length == 0){
				html += '<div id="popup_info" class="modal-header text-center"><h4 id="popup_message"></h4></div>';
			}else{
				html += '<div class="modal-header text-center" style="padding: 10px 20px 0px 20px;"><h4 id="popup_title"></h4></div>'
						+ '<div id="popup_info" class="modal-body text-center" style="padding: 0px 20px 10px 20px;"><span id="popup_message"></span></div>';	
			}
			html += '</div></div></div>';
			$("BODY").append(html);
			if(title != null && title.length > 0){
				$("#popup_title").text(title);			
			}
			$("#popup_message").text(msg);
			$("#popup_message").html($("#popup_message").text().replace(/\n/g, '<br />'));
			$.alerts._maintainPosition(true);
			switch (type) {
			case 'alert':
				$("#popup_info").after(
						'<div id="popup_panel" class="modal-footer text-center"><span id="popup_ok" class="btn btn-warning">'
							+ lBtnText +'</span></div>');
				$("#popup_ok").click(function() {
					$.alerts._hide();
					callback(true);
				});
				$("#popup_ok").focus().keypress(function(e) {
					if (e.keyCode == 13 || e.keyCode == 27)
						$("#popup_ok").trigger('click');
				});
				break;
			case 'confirm':
				$("#popup_info").after(
						'<div id="popup_panel" class="modal-footer text-center"><span id="popup_ok" class="btn btn-warning">'
							+ lBtnText +'</span><span id="popup_cancel" class="btn btn-default">'
							+ rBtnText +'</span></div>');
				$("#popup_ok").click(function() {
					$.alerts._hide();
					if (callback)
						callback(true);
				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					if (callback)
						callback(false);
				});
				$("#popup_ok").focus();
				$("#popup_ok, #popup_cancel").keypress(function(e) {
					if (e.keyCode == 13)
						$("#popup_ok").trigger('click');
					if (e.keyCode == 27)
						$("#popup_cancel").trigger('click');
				});
				break;
			}
			if ($.alerts.draggable) {
				try {
					$("#popup_container").draggable({
						handle : $("#popup_title")
					});
					$("#popup_title").css({
						cursor : 'move'
					});
				} catch (e) { 
				}
			}
			$("#popup_container").show(function() {
			
			});
		},

		_hide : function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},

		_overlay : function(status) {
			switch (status) {
			case 'show':
				$.alerts._overlay('hide');
				$("BODY").append('<div id="popup_overlay" class="modal-backdrop"></div>');
				break;
			case 'hide':
				$("#popup_overlay").remove();
				break;
			}
		},

		_maintainPosition : function(status) {
			if ($.alerts.repositionOnResize) {
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

	jAlert = function(message, title, callback, btnText) {
		$.alerts.alert(message, title, callback, btnText);
	};

	jConfirm = function(message, title, callback, lBtnText, rBtnText) {
		$.alerts.confirm(message, title, callback, lBtnText, rBtnText);
	};

})(jQuery);