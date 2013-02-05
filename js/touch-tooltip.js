$(function(){


	// iOS fake hover hack
	if ( /AppleWebKit/i.test(navigator.userAgent) && /(iPod|iPhone|iPad)/i.test(navigator.userAgent) ) {
		$(".ApplyTooltip").on("touchstart click", function(event){
			event.preventDefault();
			$(".fakeHover" ).not(this).removeClass("fakeHover");
			$(this).addClass("fakeHover");

			event.stopPropagation();
		});

		$(document.body ).on("touchstart", function(event){
			if ( !event.isPropagationStopped() ) {
				$(".fakeHover").removeClass("fakeHover");
				$(".AnimationStopped").removeClass("AnimationStopped");
			}
		});

		$(".ApplyTooltip").addClass("iOS");
	}


	$(".ApplyTooltip").on("mouseover touchstart click", function(){
		var $this = $(this);
		var $tooltip = $this.children(".TouchTooltip");

		// Quick ApplyTooltip
		if ( !$tooltip.length && $this.attr("title") && $this.attr("title").length ) {
			$tooltip = $("<span/>" ).addClass("TouchTooltip");

			var title = $this.attr("title");
			$this.removeAttr("title"); // we don't need them anymore

			if ( $this.data("styles") && $this.data("styles").length ) {
				$tooltip.addClass( $this.data("styles") );
			}else {
				$tooltip.addClass("Shadow Round Bottom Default");
			}

			var $content = $("<span/>" ).addClass("Content");

			$this.append(
					$tooltip.append(
							$content.html( title )
					)
			);
		}

		// Vertical centering for Left and Right
		if ($tooltip.hasClass("Center")) {
			$tooltip.addClass("AnimationStopped").css({
				top: ($tooltip.parent().outerHeight(true) - $tooltip.outerHeight(true))/2
			});
		}
	});
	$(".ApplyTooltip").on("mouseout touchend", function(){
		var $tooltip = $(this).children(".TouchTooltip");

		// Vertical centering for Left and Right
		$tooltip.removeClass("AnimationStopped");
	});
});