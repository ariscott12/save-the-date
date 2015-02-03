$(function() {
    var initAnimations = function() {
        var svgs = {
            mountainFront: $(".mountains-front"),
            mountainBack: $(".mountains"),
            cityscape: $(".cityscape"),
            skyline: $(".skyline"),
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

            animateCloud(obj, speed, objWidth, position);

            setTimeout(generateCloud, time);

        })();

        function animateCloud(obj, speed, objWidth, pos) {

                obj.css({
                    "width": objWidth + "px",
                    "top": pos + "px"
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
            
    };

    function drawpath(canvas, pathstr, duration, attr, callback) {
        var guide_path;
        if (typeof(pathstr) == "string")
            guide_path = canvas.path(pathstr).attr({
                stroke: "none",
                fill: "none"
            });
        else
            guide_path = pathstr;
        var path = canvas.path(guide_path.getSubpath(0, 1)).attr(attr);
        var total_length = guide_path.getTotalLength(guide_path);
        var last_point = guide_path.getPointAtLength(0);
        var start_time = new Date().getTime();
        var interval_length = 170;
        var result = path;

        var interval_id = setInterval(function() {
            var elapsed_time = new Date().getTime() - start_time;
            var this_length = elapsed_time / duration * total_length;
            var subpathstr = guide_path.getSubpath(0, this_length);
            attr.path = subpathstr;

            path.animate(attr, interval_length);
            if (elapsed_time >= duration) {
                clearInterval(interval_id);
                if (callback !== undefined) callback();
                guide_path.remove();
                initAnimations();
            }
        }, interval_length);

        return result;
    }

    // $(window).ready(function() {
        var color = "#480532";
        var paper = Raphael(document.getElementById('paper'), jQuery("#paper").width(), jQuery("#paper").height());
        $("#paper").css({
            position: 'absolute',
            top: "75px",
            left: "200px",
            'z-index': 100
        });

        var animation = function() {
            var path1 = paper.print(50, 50, "Save the Date", paper.getFont("Dancing Script"), 100).attr({
                fill: 'none',
                stroke: 'none'
            });

            setTimeout(function() {
                var stroke1 = drawpath(paper, path1, 3000, {
                    stroke: color,
                    fill: 'none',
                    'fill-opacity': 0
                }, function(e) {
                    stroke1.animate({
                        'fill-opacity': 1,
                        fill: color
                    }, 2000);
                });
            }, 0);
        };

        animation();
    // });
});