// JavaScript Document

(function() {
  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
	
	

  var canvas = document.getElementById("sig-canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#222222"; // "#222222";
  ctx.lineWidth = 4;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
	
  var empty_canvas = document.getElementById("empty-canvas");
  var empty_ctx = empty_canvas.getContext("2d");
  empty_ctx.strokeStyle = "#222222"; // "#222222";
  empty_ctx.lineWidth = 4;
  empty_ctx.fillStyle = "white";
  empty_ctx.fillRect(0, 0, empty_canvas.width, empty_canvas.height);
	
	
  var drawing = false;
  var mousePos = {
    x: 0,
    y: 0
  };
  var lastPos = mousePos;

  canvas.addEventListener("mousedown", function(e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
    console.log(lastPos)
  }, false);

  canvas.addEventListener("mouseup", function(e) {
    drawing = false;
  }, false);

  canvas.addEventListener("mousemove", function(e) {
    mousePos = getMousePos(canvas, e);
  }, false);

  // Add touch event support for mobile
  canvas.addEventListener("touchstart", function(e) {

  }, false);

  canvas.addEventListener("touchmove", function(e) {
    var touch = e.touches[0];
    var me = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchstart", function(e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var me = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchend", function(e) {
    var me = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(me);
  }, false);

  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    var posicion = $('#sig-canvas').offset();
    var left = posicion.left*1.5;
    var top = posicion.top*1.5;
    return {
      x: (mouseEvent.clientX - left)/1.5,
      y: (mouseEvent.clientY - top)/1.5
    }
  }

  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    var posicion = $('#sig-canvas').offset();
    var left = posicion.left*1.5;
    var top = posicion.top*1.5;
    return {
      x: (touchEvent.touches[0].clientX - left)/1.5,
      y: (touchEvent.touches[0].clientY - top)/1.5
    }
  }

  function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  }

  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function(e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  (function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();

  function clearCanvas() {
    canvas.width = canvas.width;
  }


function checkCanvasisEmpty() {
	
	var canvas = document.getElementById("sig-canvas");
	
	var flag;
	 if(canvas.toDataURL() == document.getElementById('empty-canvas').toDataURL()){
        alert('There is a signature missed');
		flag = 1;}
    else{
//        alert('Not empty');
		flag = 0;}

	return flag

};
	
	
// returns true if every pixel's uint32 representation is 0 (or "blank")
	
	
  // Set up the UI
  var sigText = document.getElementById("sig-dataUrl");
  var sigImage = document.getElementById("sig-image");
  var clearBtn = document.getElementById("sig-clearBtn");
  var submitBtn = document.getElementById("sig-submitBtn");
//  clearBtn.addEventListener("click", function(e) {
//    clearCanvas();
//	  
//    sigText.innerHTML = "../signatures/";  //"Data URL for your signature will go here!"
//    sigImage.setAttribute("src", "");
//  }, false);
	
	
	
//  submitBtn.addEventListener("click", function(e) {
//    var dataUrl = canvas.toDataURL();
//    sigText.innerHTML = dataUrl;
//    sigImage.setAttribute("src", dataUrl);
//  }, false);

function writing_parte_de_viajero(postGuest_json3, startDate_in){
	
				var doc = new jsPDF();
			doc.setFontSize(22);
			
			doc.setTextColor(255,0,0);
			doc.text(40, 20, 'Parte de viajeros / Hoja de bienvenida');
			
			doc.setTextColor(0,0,0);
			doc.setFontSize(16);
			doc.text(20, 45, 'Datos del establecimiento (OpenCheck)');
				
			doc.setFontSize(12);
			doc.setLineWidth(0.5);
			doc.line(20, 50, 200, 50);
				
			doc.text(20, 60, 'NIF:xxxxx ');
			doc.text(20, 70, 'Número de parte:xxxxx');
			doc.text(20, 80, 'Nombre del establecimiento:xxxxx');
			doc.text(20, 90, 'Municipio: Vigo');
			doc.text(20, 100, 'Provincia: Pontevedra');
			
			doc.line(20, 105, 200, 105);
			doc.setFontSize(16);
			doc.text(20, 125, 'Datos del viajero:');
			doc.line(20, 130, 200, 130);
			doc.setFontSize(12);
			doc.text(20, 140, 'Número de documento de identidad: '+postGuest_json3.guestDocumentNumber);
			doc.text(20, 150, 'Tipo de documento: '+ postGuest_json3.guestDocumentType);
			doc.text(20, 160, 'Fecha de expedición del documento: '+postGuest_json3.guestDocumentIssueDate);
			doc.text(20, 170, 'Nombre: '+postGuest_json3.guestFirstName);
			doc.text(20, 180, 'Apellido: '+postGuest_json3.guestLastName);
			doc.text(20, 190, 'Fecha de nacimiento: '+postGuest_json3.guestBirthDate);
			doc.text(20, 200, 'País de nacionalidad: '+postGuest_json3.guestCountry);
			doc.text(20, 210, 'Fecha de entrada: '+ startDate_in);
			doc.line(20, 215, 200, 215);

			doc.setFontSize(10);
			doc.text(20, 230, 'La recogida y tratamiento de estos datos se hará de acuerdo con la Ley Orgánica 3/2018, de 5 de');
			doc.text(20, 240, 'diciembre, de Protección de Datos Personales y garantía de los derechos digitales, y en lo que resulte');
					 
		    doc.text(20, 250, 'de aplicación, la relativa a la protección de las personas físicas en lo que respecta al tratamiento de');
					 
			doc.text(20, 260,'datos personales por parte de autoridades competentes para fines de prevención, investigación, detección');
			doc.text(20, 270,'o enjuiciamiento de infracciones penales, y al amparo Ley Orgánica 4/2015, de 30 de marzo,');
			doc.text(20, 280, 'de Protección de la Seguridad Ciudadana, artículo 25.1.');
					 
		
				
			doc.addPage();
			doc.setFontSize(16);
			doc.text(20, 40, 'Signature');
			
			

			var canvas = document.querySelector('#sig-canvas');
             var dataURL = canvas.toDataURL("image/jpeg", 1.0);
			doc.addImage(dataURL,'JPEG', 10 , 50);
	return doc
}
	
	// Generating PDF

submitBtn.addEventListener("click", function () {
	
	
				var error_scan_counter = JSON.parse(localStorage.getItem("error_scan_counter"));
				error_scan_counter = 0;
				localStorage.setItem('error_scan_counter', error_scan_counter);	
			
			
//			var doc = new jsPDF("p", "mm", [300, 300]);
//			var makePDF = document.querySelector("#makepdf");
//
//			 //fromHTML Method
//			doc.fromHTML(makePDF);
//			doc.save(".\output.pdf");
			var flag = checkCanvasisEmpty();

			if(flag == 0){
//			console.log(flag,"Canva flag");
			
			const checkbox = document.getElementById("acepta").checked;
			console.log("Politica", checkbox);
			
			if(checkbox == false){
				/*alert("You have to accept the Privacy Politics if you would like to keep going with the reservation")

				Swal.fire(
				"You have to accept the Privacy Politics if you would like to keep going with the reservation",
				icon: 'warning')*/
				Swal.fire({
				  position: 'top-end',
				  icon: 'warning',
				  title: 'You have to accept the Privacy Politics if you would like to keep going with the reservation',
				  showConfirmButton: false,
				  timer: 3000
				})

			}else{
				
			var postGuest3 = localStorage.postGuest;				
		    var postGuest_json3 = JSON.parse(postGuest3);
			var guest_aditional = localStorage.getItem("guest_aditional");				
		    var guest_aditional_json = JSON.parse(guest_aditional);
				
			var guest2process_data = JSON.parse(localStorage.getItem("guest2process_data"));				

				
				if (guest2process_data.i == 1){
					doc = writing_parte_de_viajero(postGuest_json3, postGuest_json3.startDate);}else{
					doc = writing_parte_de_viajero(guest_aditional_json, postGuest_json3.startDate);
					}
				
				
				
			
			
			console.log("Saving document ---");
			doc.save( postGuest_json3.reservationID+"_huesped_"+guest2process_data.i+'.pdf');
			}
			}
			//}
		
	
	console.log("taking picture");
	
	let guestID = postGuest_json3.guestID;
	
	document.getElementById("signature_page").style.opacity = "0";
  $("#signature_page").hide()
	document.body.background = "#DAC1C1";
	// document.getElementById("uploadLogo").style.opacity = "1";
  $("#uploadLogo").show()
	
//	let response = fetchAsync_take_send_picture("http://localhost:5000/postGuestDocument?guestID="+guestID+"&pathDocument=");
	
	
	var guest2process_data = JSON.parse(localStorage.getItem("guest2process_data"));
	console.log("Next step");
  //	if (guest2process_data.i == guest2process_data.adults){	
    
    setTimeout(function(){
      window.location.href='life_video.html'; 
      /*window.location.href='resumen_pago.html'*/
    },2000)

//	else{
//	guest2process_data.i += 1;
//	localStorage.guest2process_data = JSON.stringify(guest2process_data);
//	window.location.href='documento_id.html';
//		 	window.location.href='jot_form.html';

//	}
	
	
	
	
	
		});
	
	
})();