/*
 * hsycmsAlert 弹窗插件
 * author @ http://www.hsycms.com 
 */
var hsycmsalert_model_html = "";
hsycmsalert_model_html += " <div class=\"hsycms-model-mask\" onclick=\"hsycms.closeAll()\" id=\"hsycmsalert-mask-model\"></div>";
hsycmsalert_model_html += " <div class=\"hsycms-model hsycms-model-model\" id=\"hsycmsalert-model\">";
hsycmsalert_model_html += "  <div class=\"hsycms-model-content\">";
hsycmsalert_model_html += "  自定义的内容";
hsycmsalert_model_html += "  </div>";
hsycmsalert_model_html += "</div>";

var hsycmsalert_alert_html = "";
hsycmsalert_alert_html += " <div class=\"hsycms-model-mask\" id=\"hsycmsalert-mask-alert\"></div>";
hsycmsalert_alert_html += " <div class=\"hsycms-model hsycms-model-alert\" id=\"hsycmsalert-alert\">";
hsycmsalert_alert_html += "   <div class=\"hscysm-model-title\">温馨提示</div>";
hsycmsalert_alert_html += "   <div class=\"hsycms-model-text\">这里是内容</div>";
hsycmsalert_alert_html += "   <div class=\"hsycms-model-btn\">";
hsycmsalert_alert_html += "    <button type=\"button ok\">确定</button>";
hsycmsalert_alert_html += "   </div>";
hsycmsalert_alert_html += " </div>";

var hsycmsalert_tips_html = "";
hsycmsalert_tips_html += " <div class=\"hsycms-model-mask\" id=\"hsycmsalert-mask-tips\"></div>";
hsycmsalert_tips_html += " <div class=\"hsycms-model hsycms-model-tips\" id=\"hsycmsalert-tips\">";
hsycmsalert_tips_html += " <div class=\"hsycms-model-text\">这里是提示内容</div>";
hsycmsalert_tips_html += " </div>";

var hsycmsalert_confirm_html = "";
hsycmsalert_confirm_html += " <div class=\"hsycms-model-mask\" id=\"hsycmsalert-mask-confirm\"></div>";
hsycmsalert_confirm_html += " <div class=\"hsycms-model hsycms-model-confirm\" id=\"hsycmsalert-confirm\">";
hsycmsalert_confirm_html += "   <div class=\"hscysm-model-title\">温馨提示</div>";
hsycmsalert_confirm_html += "   <div class=\"hsycms-model-text\">确定要操作？</div>";
hsycmsalert_confirm_html += "   <div class=\"hsycms-model-btn\">";
hsycmsalert_confirm_html += "    <button type=\"button\" class=\"cancel\">取消</button>";
hsycmsalert_confirm_html += "    <button type=\"button\" class=\"ok\">确定</button>";
hsycmsalert_confirm_html += "   </div>";
hsycmsalert_confirm_html += " </div>";

var hsycmsalert_success_html = "";
hsycmsalert_success_html += "<div class=\"hsycms-model-mask\" id=\"hsycmsalert-mask-success\"></div>";
hsycmsalert_success_html += "<div class=\"hsycms-model hsycms-model-success\" id=\"hsycmsalert-success\">";
hsycmsalert_success_html += " <div class=\"hsycms-model-icon\">";
hsycmsalert_success_html += "  <svg width=\"50\" height=\"50\">";
hsycmsalert_success_html += "   <circle class=\"hsycms-alert-svgcircle\"  cx=\"25\" cy=\"25\" r=\"24\" fill=\"none\" stroke=\"#14d6a2\" stroke-width=\"2\"></circle>   ";
hsycmsalert_success_html += "   <polyline class=\"hsycms-alert-svggou\" fill=\"none\" stroke=\"#14d6a2\" stroke-width=\"2.5\" points=\"14,25 23,34 36,18\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
hsycmsalert_success_html += " </svg>";
hsycmsalert_success_html += " </div>";
hsycmsalert_success_html += " <div class=\"hsycms-model-text\">操作成功</div>";
hsycmsalert_success_html += "</div>";

var hsycmsalert_fail_html = "";
hsycmsalert_fail_html += "<div class=\"hsycms-model-mask\" id=\"hsycmsalert-mask-fail\"></div>";
hsycmsalert_fail_html += "<div class=\"hsycms-model hsycms-model-error\" id=\"hsycmsalert-fail\">";
hsycmsalert_fail_html += " <div class=\"hsycms-model-icon\">";
hsycmsalert_fail_html += "  <svg width=\"50\" height=\"50\">";
hsycmsalert_fail_html += "   <circle class=\"hsycms-alert-svgcircle\"  cx=\"25\" cy=\"25\" r=\"24\" fill=\"none\" stroke=\"#f54655\" stroke-width=\"2\"></circle>   ";
hsycmsalert_fail_html += "   <polyline class=\"hsycms-alert-svgca1\" fill=\"none\" stroke=\"#f54655\" stroke-width=\"2.5\" points=\"18,17 32,35\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
hsycmsalert_fail_html += "   <polyline class=\"hsycms-alert-svgca2\" fill=\"none\" stroke=\"#f54655\" stroke-width=\"2.5\" points=\"18,35 32,17\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />";
hsycmsalert_fail_html += " </svg>";
hsycmsalert_fail_html += " </div>";
hsycmsalert_fail_html += " <div class=\"hsycms-model-text\">操作失败</div>";
hsycmsalert_fail_html += "</div>";

var hsycmsalert_loading_html = "";
hsycmsalert_loading_html += "<div class=\"hsycms-model-mask\" id=\"hsycmsalert-mask-loading\"></div>";
hsycmsalert_loading_html += "<div class=\"hsycms-model hsycms-model-loading\" id=\"hsycmsalert-loading\">";
hsycmsalert_loading_html += " <div class=\"hsycms-model-load\">";
hsycmsalert_loading_html += "   <span></span>";
hsycmsalert_loading_html += "   <span></span>";
hsycmsalert_loading_html += "   <span></span>";
hsycmsalert_loading_html += " </div>";
hsycmsalert_loading_html += " <div class=\"hsycms-model-text\">正在加载</div>";
hsycmsalert_loading_html += "</div>";
let hsycmsalerthtml ={
		'model':hsycmsalert_model_html,
		'alert':hsycmsalert_alert_html,
		'tips':hsycmsalert_tips_html,
		'confirm':hsycmsalert_confirm_html,
		'success':hsycmsalert_success_html,
		'fail':hsycmsalert_fail_html,
		'loading':hsycmsalert_loading_html
};

var hsycms = function() {
	return {
		//打开
		open: function(id, txt = '',html) {
			$("body").append(hsycmsalerthtml[id]);
			var obj = $("#hsycmsalert-" + id);				
			$("#hsycmsalert-mask-" + id).fadeIn(300);
			obj.addClass("hsycms-ani-open");			
			var height = obj.height();
			obj.css("margin-top", "-" + Math.ceil(height / 2) + 'px');
			if (txt != '') {
				obj.find(".hsycms-model-text").html(txt);
			}
			obj.show();
			setTimeout(res => {
				obj.removeClass("hsycms-ani-open");
			}, 300)
		},

		//普通弹窗
		alert: function(txt = '', callback) {
			this.open("alert", txt);
			let that = this;
			$("body").on("click",".hsycms-model-btn",function() {				
				that.close("alert");
				if (typeof(callback) != 'undefined') {
					callback();
				}
			})
		},

		//提示弹窗
		tips: function(txt = '', callback, time = 1600) {
			this.open("tips", txt);
			let that = this;
			setTimeout(res => {
				that.close("tips");
				if (typeof(callback) != 'undefined') {
					callback();
				}
			}, time)
		},

		//询问弹窗
		confirm: function(txt = '', confirm, concel) {
			this.open("confirm", txt);
			$("body").on("click",".hsycms-model-btn button",function() {	
				hsycms.close("confirm");
				if ($(this).attr("class") == "ok") {
					confirm();
				} else {
					concel();
				}
			})
		},

		//自定义弹窗
		model: function(id,html) {
			this.open(id);
			$("#hsycmsalert-"+id).find(".hsycms-model-content").html(html);
		},

		//显示loading
		loading: function(txt) {
			this.open('loading', txt);
		},

		//隐藏loading
		hideLoading(callback) {
			this.close("loading");
			if (typeof(callback) != 'undefined') {
				callback();
			}
		},

		//操作成功提示
		success: function(txt, callback, time = 1600) {
			this.open("success", txt);
			let that = this;
			setTimeout(res => {
				that.close("success");
				if (typeof(callback) != 'undefined') {
					callback();
				}
			}, time)
		},

		//操作失败提示
		fail: function(txt, callback, time = 1600) {
			this.open("fail", txt);
			let that = this;
			setTimeout(res => {
				that.close("fail");
				if (typeof(callback) != 'undefined') {
					callback();
				}
			}, time)
		},

		//关闭
		close: function(id) {
			var obj = $("#hsycmsalert-" + id);
			$("#hsycmsalert-mask-" + id).fadeOut(200);
			obj.addClass("hsycms-ani-close");
			setTimeout(res => {
				obj.hide();
				obj.removeClass("hsycms-ani-close");
				$("#hsycmsalert-mask-" + id).remove();
				obj.remove();
			}, 300)
		},

		//关闭所有
		closeAll() {
			$(".hsycms-model-mask").fadeOut(200);
			$(".hsycms-model").addClass("hsycms-ani-close");
			setTimeout(res => {
				$(".hsycms-model").hide();
				$(".hsycms-model").removeClass("hsycms-ani-close");
				$(".hsycms-model-mask").remove();
				$(".hsycms-model").remove();
			}, 300)
		}
	}
}();
