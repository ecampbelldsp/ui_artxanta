// JavaScript Document
$('.circle').mousedown(function(){
  var tl = new TimelineMax();
  tl.to($(this), 0.2, {scaleX: 1.1, scaleY: 0.9, ease: Power2.easeOut})
    .to($(this), 0.4, {scaleX: 1, scaleY: 1, ease: Back.easeOut.config(4.7)});
});
$('.circle').mouseup(function(){
  //TweenMax.to($(this), 0.4, {scaleX: 1, scaleY: 1, ease: Back.easeOut.config(4.7)});
});