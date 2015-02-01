var initScroll = (function() {
	var svgs = {
		mountainFront: $(".mountains-front"),
		mountainBack: $(".mountains"),
		cityscape: $(".cityscape"),
		skyline: $(".clouds")
	};

	var scrollTop = $(window).scrollTop();
	var header = $(".top-svgs");
	var offset = header.offset();
	var position = (scrollTop/500)+offset.top;

	
	$(window).scroll(function(){
		scrollTop = $(window).scrollTop();
		//console.log(scrollTop);
		if(scrollTop < 365) {
			position = (scrollTop/6)+offset.top;
			position2 = -(scrollTop/8)+offset.top;
			
			//svgs.cityscape.css({"top":position});
			svgs.skyline.css({"top":position});
			//svgs.cityscape.css({"top":position});
			svgs.mountainBack.css({"top":position2});
			svgs.mountainFront.css({"top":position2});
		}
		
    });
})();