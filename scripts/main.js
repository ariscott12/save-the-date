var svgs = {
    cloudA: $(".cloudA"),
    cloudB: $(".cloudB"),
    cloudC: $(".cloudC"),
};
var cloudTimer;

function generateClouds() {
    var randomnum = Math.floor(Math.random() * 4);
    var cloudArray = ["cloudA", "cloudB", "cloudC", "cloudD"];
    var speed = Math.floor(Math.random() * 30000) + 70000;
    var objWidth = Math.floor(Math.random() * 100) + 65;
    var position = Math.floor(Math.random() * 60) + 30;
    var time = Math.floor(Math.random() * 7000) + 13000;

    $(".clouds").append("<img src = \"images/" + cloudArray[randomnum] + ".svg" + "\" />");
    var obj = $(".clouds img:last-child");

    animateCloud(obj, speed, objWidth, position);
    cloudTimer = setTimeout(generateClouds, time);
}

function animateCloud(obj, speed, objWidth, pos) {
    var width = $(window).width();
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

var offset = $(".main").offset();
var setLeaves = true;
$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > offset.top - 100 && setLeaves === true) {
        $(document).octoberLeaves('start');
       // clearTimeout(cloudTimer);
        setLeaves = false;
    }
    if (scrollTop < 500 && setLeaves === false) {
        $(document).octoberLeaves('stop');
        setLeaves = true;
    }
});

jQuery(document).octoberLeaves({
    leafStyles: 3, // Number of leaf styles in the sprite (leaves.png)
    speedC: 2, // Speed of leaves
    rotation: 1, // Define rotation of leaves
    rotationTrue: 0, // Whether leaves rotate (1) or not (0)
    numberOfLeaves: 8, // Number of leaves
    size: 40, // General size of leaves, final size is calculated randomly (with this number as general parameter)
    cycleSpeed: 30 // <a href="http://www.jqueryscript.net/animation/">Animation</a> speed (Inverse frames per second) (10-100)
});
$(document).octoberLeaves('stop');


var initAnimations = function() {
    $(".static").animate({
        "opacity": 1
    }, 1800, function() {
        $("header h1").css({
            "display": "block"
        });
        $('.tlt').textillate({ in : {
                effect: 'bounceIn',
                delay: 75,
                callback: function() {

                    $(".the-date h2").fadeIn(1200);
                    $(".learn-more").animate({
                        "left": "245px"
                    }, 500, "easeInOutBounce", function() {
                        generateClouds();
                    });
                }
            }
        });
    });
};

$(".learn-more").click(function() {
    $('html,body').animate({
        scrollTop: $(".main").offset().top
    }, 1800);
});

$(window).load(function() {
    $("#loader").fadeOut(1000);
    initAnimations();
});