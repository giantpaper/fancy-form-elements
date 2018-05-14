(function($) {
	$.fn.fancyFormElements = function() {
		
		$(this).parent().mouseup(function(){
			$(this).focus();
		});
		
		return this
			.each(function() {
				var type = $(this).attr("type") || this.tagName.toLowerCase(),
					placeholder = $(this).attr('placeholder') || $(this).hasClass('has-placeholder')
					required = ( $(this).attr('required') ? 'required' : null);
				
				$(this).wrap('<span class="wrapper ' + type + '">');
				$(this).parent().parent()
					.addClass(placeholder !== '' || placeholder === true ? 'has-placeholder' : null)
					.addClass(required);
			})
			.on("focus blur", function(e) {
				var t1 = $(this),
					type = $(this).attr("type") || this.tagName.toLowerCase();
				
				if (t1[0].validationMessage !== "") {
					t1.parent().addClass("error");
				} else {
					t1.parent().removeClass("error");
				}
				if (e.type === "focus") {
					if (t1.parent().is(".checkbox")) {
						t1.parent().toggleClass("checked");
						t1
							.prop("checked", function(i, key) {
								return key === "checked" ? null : "checked";
							})
							.attr("checked", function(i, key) {
								return key === "checked" ? null : "checked";
							});
					} else if (t1.parent().is(".radio")) {
						var name = t1.attr("name");
						$("form input[name=" + name + "]")
							.prop("checked", "")
							.removeAttr("checked")
							.parent()
							.removeClass("checked");
						t1
							.prop("checked", "checked")
							.attr("checked", "checked")
							.parent()
							.addClass("checked");
					}
				}
				$(this)
					.parent()
					.toggleClass("clicked");
			});
	};
})(jQuery);