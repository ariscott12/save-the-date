$(function() {
    var initAnimations = (function() {
        var svgs = {
            mountainFront: $(".mountains-front"),
            mountainBack: $(".mountains"),
            cityscape: $(".cityscape"),
            skyline: $(".clouds"),
            cloudA: $(".cloudA"),
            cloudB: $(".cloudB"),
            cloudC: $(".cloudC")
        };

        var scrollTop = $(window).scrollTop();
        var header = $(".top-svgs");
        var offset = header.offset();
        var position = (scrollTop / 500) + offset.top;
        var width = $(window).width();


        $(window).scroll(function() {
            scrollTop = $(window).scrollTop();
            //console.log(scrollTop);
            if (scrollTop < 365) {
                position = (scrollTop / 6) + offset.top;
                position2 = -(scrollTop / 8) + offset.top;

                //svgs.cityscape.css({"top":position});
                svgs.skyline.css({
                    "top": position
                });
                //svgs.cityscape.css({"top":position});
                svgs.mountainBack.css({
                    "top": position2
                });
                svgs.mountainFront.css({
                    "top": position2
                });
            }
        });


        (function generateCloud() {
            var randomnum = Math.floor(Math.random() * 4);
            console.log(randomnum);
            var cloudArray = ["cloudA", "cloudB", "cloudC", "cloudD"];
            var speed = Math.floor(Math.random() * 30000) + 70000;
            var objWidth = Math.floor(Math.random() * 100) + 65;
            var position = Math.floor(Math.random() * 60) + 30;
            var time = Math.floor(Math.random() * 7000) + 13000;
            console.log(time);
            var obj = "";
            //console.log(objWidth);
            $(".clouds").append("<img src = \"images/" + cloudArray[randomnum] + ".svg" + "\" />");
            obj = $(".clouds img:last-child");

            animateCloud(obj, speed,objWidth, position);

            setTimeout(generateCloud, time);

        })();
      
        function animateCloud(obj, speed, objWidth, pos) {
             
                obj.css({
                    "width": objWidth+"px",
                    "top": pos +"px"
                });
                obj.animate({
                        "left": width,
                    },
                    speed,
                    "linear",
                    function() {
                        $(this).remove();
                    });
            }
            // animate_cloudA();
            // animate_cloudB();
            // animate_cloudC();
    })();
});