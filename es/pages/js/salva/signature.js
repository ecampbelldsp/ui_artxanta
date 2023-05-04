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
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    }
  }

  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    }
  }

  function renderCanvas() {
    if (drawing) {
    //console.log(document.width)
    	var prop = 0.33;					//Correccion por zoom en el body
    	corrX = (lastPos.x * prop)+95;
    	corrY = (lastPos.y * prop)+287;
      	ctx.moveTo(lastPos.x-corrX, lastPos.y-corrY);
      	ctx.lineTo(mousePos.x-corrX, mousePos.y-corrY);
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

	
	// Generating PDF

submitBtn.addEventListener("click", function () {
			
			
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
				alert("You have to accept the Privacy Politics if you would like to keep going with the reservation")
			}else{
				
			var postGuest3 = localStorage.postGuest;				
		    var postGuest_json3 = JSON.parse(postGuest3);
				
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
			doc.text(20, 210, 'Fecha de entrada: '+postGuest_json3.startDate);
			doc.line(20, 245, 200, 245);

			doc.setFontSize(9);
			doc.text(20, 255, 'La recogida y tratamiento de estos datos se hará de acuerdo con la Ley Orgánica 3/2018, de 5 de');
			doc.text(20, 260, 'diciembre, de Protección de Datos Personales y garantía de los derechos digitales, y en lo que resulte');
					 
		    doc.text(20, 265, 'de aplicación, la relativa a la protección de las personas físicas en lo que respecta al tratamiento de');
					 
			doc.text(20, 270,'datos personales por parte de autoridades competentes para fines de prevención, investigación, detección');
			doc.text(20, 275,'o enjuiciamiento de infracciones penales, y al amparo Ley Orgánica 4/2015, de 30 de marzo,');
			doc.text(20, 280, 'de Protección de la Seguridad Ciudadana, artículo 25.1.');
					 
		
				
			doc.addPage();
			doc.setFontSize(16);
			doc.text(20, 40, 'Signature');
			
			

			var canvas = document.querySelector('#sig-canvas');
             var dataURL = canvas.toDataURL("image/jpeg", 1.0);
			doc.addImage(dataURL,'JPEG', 10 , 50);
			
			console.log("Saving document ---");
			doc.save('test.pdf');
			location.href="pago.html";
			
			}
			}
			//}
		
	
	console.log("taking picture");
	
	let guestID = postGuest_json3.guestID;
	
	document.getElementById("signature_page").style.opacity = "0";
	document.body.background = "#DAC1C1";
	document.getElementById("uploadLogo").style.opacity = "1";
	
	let response = fetchAsync_take_send_picture("http://localhost:5000/postGuestDocument?guestID="+guestID+"&pathDocument=");
	
	
	
		});
	
	
//function isCanvasBlank(canvas) {
//  const context = canvas.getContext('2d');
//
//  const pixelBuffer = new Uint32Array(
//    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
//  );
//
//  return !pixelBuffer.some(color => color !== 0);
//}
	
	
//	// Convert canvas to image
//document.getElementById('sig-submitBtn').addEventListener("click", function(e) {
//    var canvas = document.querySelector('#sig-canvas');	
//    var dataURL = canvas.toDataURL("image/jpeg", 1.0);
//	
//	// Save | Download image
//	
//	var a = document.createElement('a');
//    a.href = dataURL;
//    a.download = 'my-canvas.jpeg';
//    document.body.appendChild(a);
//    a.click();
//	
//});

	
//var button = document.getElementById("makepdf").appendChild(canv);
	
	
// Save | Download image
//function downloadImage(data, filename = 'untitled.jpeg') {
//    var a = document.createElement('a');
//    a.href = data;
//    a.download = filename;
//    document.body.appendChild(a);
//    a.click();
//}
	
	
	
})();
