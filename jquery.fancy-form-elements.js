(function($) {
	$.fn.fancyFormElements = function() {
		var t = $(this);

		return this.each(function() {
			var classes = [];
			
			classes.push( $(this).attr("type") || this.tagName.toLowerCase() );

			$(this).wrap('<span class="wrapper ' + classes.join(' ') + '">');
		}).on("focus blur", function(e) {
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

$(document).ready(function() {
	$("form *:input").fancyFormElements();
	
	$('form').submit(function(e){
		e.preventDefault();
	});
});
