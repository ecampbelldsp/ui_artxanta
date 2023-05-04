var siteW = $(window).width();
var siteH = $(window).height();

//$("p").css({ lineHeight: siteH + 'px' }); // dirty dirty

TweenMax.set(".site", { perspective: 5000 });
TweenMax.set(".container", { transformStyle: "preserve-3d",  transformOrigin: 'center' });
//TweenMax.set(".container", { rotationY: 90, z: -siteW/2, x: siteW/2 });

var tlFlip = new TimelineMax({ yoyo: true, repeat: 0, delay: 0, repeatDelay: 2 });

tlFlip
.to('.site', .5, { scale: 1.5, ease: Power2.easeInOut }, "start")
//.to('.site', .5, { scale: 1, ease: Power2.easeInOut }, "start+=1.2");
//.to('.container', .4, { rotationY: -90, z: -siteW, ease: Power2.easeInOut }, "start+=0.7")

function hide(id) {
for(var i=0;i<id.length;i++){
  var x = document.getElementById(id[i]);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
	}
	
}


function show_localizador() {
  var loc = document.getElementById("form_localizador");
//	var qr = document.getElementById("form_qr");
	var reserva_op = document.getElementById("reserva_op");
	loc.style.display = "block";
//	qr.style.display = "none";
	reserva_op.style.display = "none";
//	document.getElementById("localizador").focus();

}

function show_qr() {
  var loc = document.getElementById("form_localizador");
//	var qr = document.getElementById("form_qr");
	var reserva_op = document.getElementById("reserva_op");
	loc.style.display = "none";
//	qr.style.display = "block";
	reserva_op.style.display = "none";

}





