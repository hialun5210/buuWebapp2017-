$.fn.extend({
    autogrow: function (options) {var _this = this;
        this._options = {
            minHeight: 100,
            maxHeight: 9999,
            initHasData: false,
            hasInit: false
        } 
        //初始化
        this.init = function () {
            for (var p in options) {
                this._options[p] = options[p];
            }
            if (this._options.minHeight == 0) {
                this._options.minHeight = parseFloat($(this).height());
            }
            for (var p in this._options) {
                if ($(this).attr(p) == null) {
                    $(this).attr(p, this._options[p]);
                }
            }
           
            $(this).keyup(this.resetHeight).change(this.resetHeight)
                .focus(this.resetHeight());
        }
        //重设高度
        this.resetHeight = function () {
            var _minHeight = parseFloat($(this).attr("minHeight"));
            var _maxHeight = parseFloat($(this).attr("maxHeight"));

            var h = parseFloat($(_this).height()+$(_this).scrollTop());
            var isIE11 = (navigator.userAgent.toLowerCase().indexOf("trident") > -1 && navigator.userAgent.indexOf("rv") > -1); //ie11
            var isChrome = (navigator.userAgent.toLowerCase().indexOf("chrome") > -1); //谷歌浏览器
            if ($.browser.msie || isIE11 || isChrome) {
                var padding = $(this).outerHeight(true) - $(this).height();
                h = h - padding;
            }

            h = h < _minHeight ? _minHeight : h > _maxHeight ? _maxHeight : h;
            $(this).height(h).scrollTop(h);
            if (h >= _maxHeight) {
                $(this).css("overflow-y", "auto");
            }
            else {
                $(this).css("overflow-y", "hidden");
            }

        }
        if (!this._options.hasInit) {
            this.init();
        }
        if (this._options.initHasData) {
            $(this).focus().blur();
        }

    }
});
