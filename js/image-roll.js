$(function() {
$(".roll").css("opacity","0");
$(".roll").hover(function () {
$(this).stop().animate({
opacity: .7
}, "slow");
},
function () {
$(this).stop().animate({
opacity: 0
}, "slow");
});
});