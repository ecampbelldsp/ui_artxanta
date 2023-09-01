// JavaScript Document
//
//	const HEADER = { "Access-Control-Allow-Origin":  "*",
//"Access-Control-Allow-Methods": "POST, GET",
//"Access-Control-Allow-Headers": "Content-Type, Authorization"
//};
//	


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

 async function fetchAsync_getnumberOfGuests() {
	
	var postGuest = localStorage.postGuest;				
	var postGuest_json = JSON.parse(postGuest);
	var reservationID = postGuest_json.reservationID;
	console.log("Reservation ", reservationID);
	try{
		let response = await fetch("http://localhost:5000/getNumberOfGuests?reservationID="+reservationID, {method: 'GET'});
	}
	catch(error){
		Swal.fire(
			'Something is wrong...',
			"The system is down. Contact Technical Support",
			'error'
  		)
	}
	
//	try{
//		let response = await fetch("http://localhost:5000/getNumberOfGuests?reservationID="+reservationID, {method: 'GET'});}
//	catch(error){
//		console.log("There was an error", error);
//		alert("Call IT support. System is down");
//	}
	 
	 
	let data = await response.json();
//	data = data["numberOfGuests"];
	console.log(" Response of Number of Guests request",data);
	
	if(data["success"] === "true"){
		
		postGuest_json.numberOfGuests = data["numberOfGuests"];
		localStorage.setItem("postGuest", JSON.stringify(postGuest_json));
		console.log("Number of Guests saved",postGuest_json.numberOfGuests);
	};
	
	 return true
}


async function fetchAsync_getReservation(url) {
	
	
//  		let response = await fetch(url);
		
		try{
			var response = await fetch(url);}
		catch(error){
			console.log("There was an error", error);
			// alert("Call IT support. System is down");
			Swal.fire(
				'Something is wrong...',
				'The system is down. Contact Technical Support',
				'error'
				)

				await sleep(3000);
		}
	
	
		let waitLogo = document.getElementById("waitLogo");
		waitLogo.style.display = "none";
		let resumen_reserva = document.getElementById("resumen_reserva");
		resumen_reserva.style.opacity = "1";

		let frame = document.getElementById("frame");
		frame.style.opacity = "1";
	
		let data = await response.json();

		if(data["success"] == true){
			let request_info_json = data["data"];

			var postGuest_json = JSON.parse(localStorage.postGuest);

			console.log("request_api", request_info_json);
			postGuest_json.guestFirstName = request_info_json.guestFirstName;// + " " + request_info_json.guestLastName;
			postGuest_json.guestLastName = request_info_json.guestLastName;
			postGuest_json.startDate = request_info_json.startDate;
			postGuest_json.endDate = request_info_json.endDate;
			postGuest_json.balance = request_info_json.balance;
			postGuest_json.roomType = request_info_json.roomTypeName;
			postGuest_json.adults = request_info_json.adults;
			postGuest_json.guestID = request_info_json.guestID;
			postGuest_json.paid = request_info_json.paid;

			postGuest_json.roomID = request_info_json.roomID;
			postGuest_json.total = request_info_json.total;

//			let log1 = document.getElementById('nombre')
			let log2 = document.getElementById('hab')
			let log3 = document.getElementById('fechain')
			let log4 = document.getElementById('huespedes')

			// Resumen de reserva

//			log1.textContent = postGuest_json.guestFirstName +  " " + postGuest_json.guestLastName;
			log2.textContent =postGuest_json.roomType;
			log3.textContent = postGuest_json.startDate;
			log4.textContent = postGuest_json.adults;

			localStorage.postGuest = JSON.stringify(postGuest_json);
			console.log("mi_post",postGuest_json);

			let guest2process_data = JSON.parse('{"adults":"","i":1}');
			guest2process_data.adults = parseInt(postGuest_json.adults);
			localStorage.setItem("guest2process_data", JSON.stringify(guest2process_data));

			console.log("Guest to collect data: ", guest2process_data)
			return "true";}
			
		else{
				
			console.log("data", data);
			// alert("No existe una reserva con la información que nos ha proporcionado");
			 

			Swal.fire({
				  position: 'center',
				  icon: 'error',
				  allowOutsideClick: false,
				  title: 'There is no reservation with the information you have provided us.<br>\n',
				  showConfirmButton: false,
				  timer: 3000
				})

			await sleep(3000);

			window.location.href = "check_in.html";
			return "false";
		}
	
	
}

async function getReservationInvoiceInformation(url){
	
			var postGuest_json = JSON.parse(localStorage.postGuest);

//	  		var response = await fetch(url);
	
			try{
				var response = await fetch(url);}
			catch(error){
				console.log("There was an error", error);
				// alert("Call IT support. System is down");
				Swal.fire(
					'Something is wrong...',
					'The system is down. Contact Technical Support',
					'error'
				)
			}
	
	
	
			let data = await response.json();

			console.log("Storage miss", postGuest_json);

			console.log("2da call", data);
			if(data["success"] == "false"){
				// alert("Hubo un error en la creacion de la reserva. Sera remitido a la pagina principal");
				Swal.fire(
					'Something is wrong...',
					"There was an error in the creation of the reservation. You will be redirected to the main page",
					'error'
				)
				window.location.href='../index.html';
					
				};
		//let data_request = await response.json();
		   	postGuest_json.balance = data["balance"];//data_request["grandTotal"]; 1125
		   	postGuest_json.paid = data["paid"];//0;
		   	postGuest_json.total = data["total"];//data_request["grandTotal"];  1125
		   	postGuest_json.paidStatus = data["paidStatus"];//data_request["grandTotal"];  1125
	
			localStorage.postGuest = JSON.stringify(postGuest_json);
	
//			console.log("LAst storage",localStorage.postGuest );
//	
//	
//			postGuest_jsonPago = JSON.parse(localStorage.postGuest);
//
//			console.log("post response",response_web);


			var totalmoney = document.getElementById('totalmoney');
			var pagado = document.getElementById('pagado');
			var deuda = document.getElementById('deuda');

			totalmoney.textContent = postGuest_json.total + " €";
			pagado.textContent = postGuest_json.paid + " €";
			deuda.textContent = postGuest_json.balance + " €";

			console.log("Pagado ",postGuest_json.paid);
	
//			var totalmoney = document.getElementById('totalmoney');
//			var pagado = document.getElementById('pagado');
//			var deuda = document.getElementById('deuda');
//
//			totalmoney.textContent += postGuest_json.total + " €";
//			pagado.textContent += postGuest_json.paid + " €";
//			deuda.textContent += postGuest_json.balance + " €";
//	

}

//async function fetchAsync_take_send_picture(url) {
//
//		var postGuest = localStorage.postGuest;				
//		var postGuest_json = JSON.parse(postGuest);
//	
//  let response = await fetch("http://127.0.0.1:5000/cam");
//	
//	console.log("web cam",response);
//	
//	var guestID = postGuest_json.guestID;
//	
//	// Sending picture to cloudbed
//	
//	let response_web = await fetch(url+"D:/Projects/OpenCheck_restapi/data/photo/picture.png");
//	
//	console.log("uploading document",response_web);
//	
//	
//}


async function fetchAsync_getAvailableRooms(url) {
	
	
		var postGuest_json = JSON.parse(localStorage.postGuest);
		
		try{
  			var response = await fetch(url);}
		catch(error){
			console.log("There was an error", error);
			// alert("Call IT support. System is down");
				Swal.fire({
				  position: 'top-end',
				  icon: 'warning',
				  title: 'Server down. Contact IT Support',
				  showConfirmButton: false,
				  timer: 3000
				})
		}
		

		let data_request = await response.json();
		data = data_request["success"];
		
		console.log("request room  info ended");
	

		
		postGuest_json.availableRooms = data_request["availableRooms"];
		postGuest_json.rooms = data_request["rooms"];
		localStorage.postGuest = JSON.stringify(postGuest_json);

		console.log("available rooms", data_request["availableRooms"]);		
  		console.log("Rooms", data_request["rooms"]);		
		
		
			if(data === false){
			
			//alert("Habitaciones no disponibles. Por favor, escoja otra fecha");
			Swal.fire(
				'No hay habitaciones disponibles',
				"Por favor, escoja otra fecha",
				'error'
			)
				
				
			
		} else{
			
			 window.location.href = "picking_room_type.html";
		};
	
						var waitLogo = document.getElementById("waitLogo");
					waitLogo.style.opacity = "0";

					var resumen_reserva = document.getElementById("frame");
					resumen_reserva.style.opacity = "1";
	
					var atras = document.getElementById("atras");
					atras.style.opacity = "1";
													
//			};
	
//		return data["success"];
	
	
}


async function fetchAsync_postReservation(url,data) {
	
	
		var postGuest_json = JSON.parse(localStorage.postGuest);
	
		
//  		let response = await fetch(url,  {method: 'POST',   headers: {'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-lencoded',
//    },body: data});
	
	
		try{
			var response = await fetch(url,  {method: 'POST',   headers: {'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-lencoded',
    		},body: data});}
		catch(error){
			console.log("There was an error", error);
//			alert("Call IT support. System is down");
			Swal.fire(
				'Something is wrong...',
				"The system is down. Contact Technical Support",
				'error'
			)
		}
	
		
//		var body = document.getElementsByTagName('body')[0];

		let data_request = await response.json();
//		data_request = JSON.parse(data_request);
	
		data = data_request["success"];
		console.log("Post success info",data_request );
		console.log("grandTotal info", data_request["grandTotal"]);
	
		
	
	   if(data===true){
//		   alert("ID de reserva creado con éxito");
		   
//		   postGuest_json.reservationID = data_request["reservationID"];
//		   postGuest_json.balance = data_request["grandTotal"];
//		   postGuest_json.paid = 0;
//		   postGuest_json.total = data_request["grandTotal"];
	   }else{
		console.log("data", data_request);
//		   alert(data_request["message"]);
		//    alert(data_request["message"]);

				   Swal.fire(
					'Something is wrong...',
					"Reserve could not be created.",
					'error'
				)
				await sleep(3000)

		   //		   	postGuest_json.balance = data_request["grandTotal"];
//		   postGuest_json.paid = 0;
//		   postGuest_json.total = data_request["grandTotal"];
		   window.location.href = "picking_date.html";
	   }

		   postGuest_json.reservationID = data_request["reservationID"];
		  /* postGuest_json.balance = data_request["grandTotal"];
		   postGuest_json.paid = 0;
		   postGuest_json.total = data_request["grandTotal"];*/
	
		console.log("request room  info ended", postGuest_json);
	
	localStorage.postGuest = JSON.stringify(postGuest_json);
	
	
}


async function fetchAsync_getPago(url) {
	
	
		var postGuest_json = JSON.parse(localStorage.postGuest);
	
		try{
  		let response = await fetch(url,  {  
       method: 'GET',  
//       withCredentials: true,  
//       crossorigin: true,  
//       mode: 'cors',   
//		headers:{"Access-Control-Allow-Origin":"*"}
     }
								  );  
								  
		} catch(error){
			Swal.fire(
				'Something is wrong...',
				"The system is down. Contact Technical Support",
				'error'
			)
		}

		response = response.json()
	
				console.log("llamada api de java", response);

		
   };  
	
	
	
async function fetchAsync_getScan(url,tipo) {

	if(tipo == "dni"){
		$("#escaneoFrontal").hide();
		// $("#escaneoReverso").show();
		$("#instruccionesDni").text('Coloque el DNI en el escáner con la foto hacia abajo y pulse "Continuar"')
		
	}
	$("#terminando").show()
	
		var waitLogo = document.getElementById("waitLogo");
		waitLogo.style.opacity = "1";
	
		var scan_var = document.getElementById("scan");
		scan_var.style.opacity = "0";
		if(tipo == "dni"){
			scan_var.style.opacity = "1";
		}
	
		var atras = document.getElementById("atras");
		atras.style.opacity = "0";
	
		var frame = document.getElementById("frame");
		atras.style.opacity = "0";
		
		try{
  			var response = await fetch(url);

			var data = await response.json();
			if (data.success == false)
			{
				Swal.fire({
				  position: 'top-end',
				  icon: 'error',
				  title: 'Place the document properly and scan it again.',
				  showConfirmButton: false,
				  timer: 3000
				})

			}
		} catch(error){
			Swal.fire(
				'Something is wrong with the scanner...',
				"You are required to submmited manually your personal information",
				'error')
			
			await sleep(3000);
			
			window.location.href = "jot_form.html";
	
		
		}

		console.log("Scanning");
	
		
		try {
		var success = data["status"];
		}
		catch(err) {
		var success = data["success"];
		}

	
		var success = data["success"];
	
  		console.log("Sucess",success);
		
		var guest2process_data = JSON.parse(localStorage.getItem("guest2process_data"));
	
  		var postGuest = localStorage.postGuest;				
		var guest_aditional = localStorage.guest_aditional;

		if(guest2process_data.i == 1){
			var postGuest_json = JSON.parse(postGuest);
		}else{
			var postGuest_json = JSON.parse(guest_aditional);
			var tmp_json = JSON.parse(postGuest);
			postGuest_json.startDate = tmp_json.startDate;
		}
	
		
		console.log("Document_id", postGuest);
	
		var request_info_json = data;

		postGuest_json.guestFirstName = request_info_json.mrzGivenname;// + " " + request_info_json.guestLastName;
		postGuest_json.guestLastName = request_info_json.mrzSurname;
		//postGuest_json.startDate = request_info_json.startDate;
		postGuest_json.guestBirthDate = request_info_json.mrzBirthDate;
		postGuest_json.guestCountry = request_info_json.mrzNationality;
		postGuest_json.guestDocumentType = request_info_json.mrzDocType;
		postGuest_json.guestDocumentExpirationDate = request_info_json.mrzExpiryDate;
		postGuest_json.guestDocumentIssuingCountry = request_info_json.mrzIssueCountry;
		postGuest_json.guestDocumentNumber = request_info_json.mrzPersonalNumber;
		

	
		var go;

		if(guest2process_data.i == 1){
			localStorage.setItem("postGuest", JSON.stringify(postGuest_json));
			go = "email.html"
			
		}else{
			go = "signature.html";
			localStorage.setItem("guest_aditional", JSON.stringify(postGuest_json));
		}
	
		
		//localStorage.setItem("postGuest", JSON.stringify(postGuest_json));
		console.log("mi_post",postGuest_json);
		

	

		waitLogo.style.opacity = "0";
		scan_var.style.opacity = "1";
		frame.style.opacity = "1";
		
		if(data["success"] === true){
			var guest2process_data = JSON.parse(localStorage.getItem("guest2process_data"));
			var header = document.getElementById("guest");  //header_14
			header.textContent = " Huespéd # "+ guest2process_data.i; 	
			console.log("PLOP!!!")
			document.getElementById("plop").play()

			window.location.href = go;
		}
		else{
			waitLogo.style.opacity = "0";
			scan_var.style.opacity = "1";
			frame.style.opacity = "1";


			var error_scan_counter = JSON.parse(localStorage.getItem("error_scan_counter"));
			error_scan_counter += 1;

			localStorage.setItem('error_scan_counter', error_scan_counter);		

			if(error_scan_counter >3){

				Swal.fire({
				  position: 'top-end',
				  icon: 'error',
				  title: ' Maximun number of attemnpts. You are required to submmited manually your personal information',
				  showConfirmButton: false,
				  timer: 3000
				})

				await sleep(3000);

				window.location.href = "jot_form.html";
				}
			else{

				await sleep(3000);

				window.location.href = "documento_id.html";
			}

	
		}
	
		atras.style.opacity = "1";
	
		return "true";
	
	
};


async function fetchAsync_sendGmail() {
	
	var postGuest = localStorage.postGuest;				
	var postGuest_json = JSON.parse(postGuest);
	var reservationID = postGuest_json.reservationID;
	var emailClient = postGuest_json.guestEmail;

	console.log("Reservation ", reservationID);
	 http://localhost:5000/sendEmail?TO=ecampbelldsp%40gmail.com&reservationID=22
	try{
	var response = await fetch("http://localhost:5000/sendEmail?reservationID="+reservationID+"&TO="+emailClient, {method: 'GET'});

  	} catch(error){
		Swal.fire(
			'Something is wrong...',
			"The system is down. Contact Technical Support",
			'error'
		)
 	 }
	  return response


};

async function fetchAsync_PostPaymentConfirmation(){

	var postGuest_jsonPago = JSON.parse(localStorage.postGuest);
	//url = "http://localhost:5000/paymentNotification?amount="+postGuest_jsonPago.balance+"&reservationID="+postGuest_jsonPago.reservationID;
	url = "http://localhost:5000/paymentNotification?amount="+postGuest_jsonPago.balance+"&reservationID="+postGuest_jsonPago.reservationID;
	console.log("URL payment confirmation", url);

	console.log("Llamando payment confirmation");
	try{
		let response = await fetch(url,  {method: 'GET'});
		
		let data =  await response.json();
		
					//response = response.json();
			console.log("Success payment confirmation",data["success"]);
			console.log("Response",data);

			/*if(data.success === false)
				{

				}
				
			else if (data.success === "true")
				{
				
				Swal.fire(
				data.message)
				await sleep(3000);
				window.location.href = 'take_key.html';
				}*/
		
	
	} catch(error){
			console.log("Success payment confirmation",data["success"]);

	}	

};

async function makePayment_cash(url){
	
	console.log("Llamando api de pago en efectivo");
	try{
		let response = await fetch(url);
		
		let data =  await response.json();
		
					//response = response.json();
			console.log("Success",data["success"]);
			console.log("Response",data);

			if(data.success == "false")
				{
				Swal.fire(
				data.message,
				'error')
				await sleep(3000);
				window.location.href = 'pago.html';
				}
				
			else if (data.success == "true")
				{
				fetchAsync_PostPaymentConfirmation();
				Swal.fire(
				data.message)
				await sleep(3000);
				window.location.href = 'take_key.html';
				}
		
		//return data;
	
	} catch(error){
		Swal.fire(
			'Something is wrong...',
			"The system is down. Contact Technical Support",
			'error'
		)
	}	
};


async function makePayment_TPV(url){
	
	console.log("Llamando api de pago en tarjeta");
	try{

		//fetchAsync_PostPaymentConfirmation()
		let response = await fetch(url);
		
		let data =  await response.json();
		
					//response = response.json();
			console.log("Success",data["success"]);
			console.log("Response",data);

			if(data.success == "false")
				{
				Swal.fire(
				data.message,
				'error')
				await sleep(3000);
				window.location.href = 'pago.html';
				}
			else if (data.success == "true")
				{
				fetchAsync_PostPaymentConfirmation();
				Swal.fire(
				data.message)
				await sleep(3000);
				window.location.href = 'take_key.html';
				}
		
		//return data;
	
	} catch(error){
		Swal.fire(
			"Unsuccessful payment",
			'error'
		)
	}	
};

async function fetchAsync_take_key(url, input){
	
	try{
		console.log("Take key call response starting", input);
		var response = await fetch(url,  {method: 'POST',   headers: {'Content-Type': 'application/json'},body: input});
		let data =  await response.json();
		console.log("Take key call response", data);
	}catch(error){
		console.log("Error",error);
		// alert("There was an error with your key. Call IT support");
		Swal.fire(
			'Something is wrong...',
			"There is an error with your key. Contact Technical Service",
			'error'
		)
	}
	
}

async function fetchAsync_print_ticket(url, data){
	
	try{
		var response = await fetch(url,  {method: 'POST',   headers: {'Content-Type': 'application/json'},body: data});
		console.log(response);
	}catch(error){
		console.log("Error",error);
		// alert("There was an error with your key. Call IT support");
		Swal.fire(
			'Something is wrong...',
			"There is an error with the ticket printing. Contact Technical Service",
			'error'
		)
	}
	
}

async function parteViajero(url) {

	console.log("Cargando numero de parte de viajero");
	try {
		let response = await fetch(url);

		let data = await response.json();

		//response = response.json();
		console.log("Success", data["success"]);
		console.log("Response", data);

		if (data.success == "false") {
			console.log("Error creando parte e viajero");

		}

		else if (data.success == "true") {
			var num_parte = data["data"];
			var parte = document.getElementById("parte");
			parte.textContent += data["data"];
		}

		//return data;

	} catch (error) {
		console.log("Error creando nuemro de parte de viajero");
		/*Swal.fire(
			'Something is wrong...',
			"The system is down. Contact Technical Support",
			'error'
		)*/
	}
};


async function fetchAsync_getPicture(url) {
	
		
		var camera = document.getElementById("camera");
		camera.style.opacity = "1";
	
		try{
			var response = await fetch(url);
			var  data = await response.json();
			}
		catch(error){
			console.log("Camara error", error);
			// alert("Call IT support. Camara error.");
			
			Swal.fire(
				'Something is wrong...',
				"There is an error with the camera. Contact Technical Service",
				'error'
			)
		}
		
		console.log("Response camera",data);

		if(data["success"] == true){
			
			var guest2process_data = JSON.parse(localStorage.getItem("guest2process_data"));
			console.log("Next step", guest2process_data);
			if (guest2process_data.i == guest2process_data.adults){
			 window.location.href='resumen_pago.html';} /*window.location.href='resumen_pago.html'*/
			else{
			guest2process_data.i += 1;
			localStorage.guest2process_data = JSON.stringify(guest2process_data);
			window.location.href='documento_id.html';
//		 	window.location.href='jot_form.html';
			}
			return "true";
		}
		else{
			// alert("aaCall IT support. Camara error.");
			Swal.fire(
				'Something is wrong...',
				"The camera reports an error. Contact Technical Service",
				'error'
			)
//			window.location.href = "check_in.html";
			return "false";
		}	

}





		

		
	
