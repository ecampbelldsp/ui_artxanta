// JavaScript Document
//
//	const HEADER = { "Access-Control-Allow-Origin":  "*",
//"Access-Control-Allow-Methods": "POST, GET",
//"Access-Control-Allow-Headers": "Content-Type, Authorization"
//};
//	
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
	 
	let response = await fetch("http://localhost:5000/getNumberOfGuests?reservationID="+reservationID, {method: 'GET'});
	 
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
	
	
  		let response = await fetch(url);
		
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

			let log1 = document.getElementById('nombre')
			let log2 = document.getElementById('hab')
			let log3 = document.getElementById('fechain')
			let log4 = document.getElementById('huespedes')

			// Resumen de reserva

			log1.textContent = postGuest_json.guestFirstName +  " " + postGuest_json.guestLastName;
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
			alert("No existe una reserva con la información que nos ha proporcionado");
			window.location.href = "check_in.html";
			return "false";
		}
	
	
}

async function getReservationInvoiceInformation(url){
	
			var postGuest_json = JSON.parse(localStorage.postGuest);

	  		let response = await fetch(url);
			let data = await response.json();

			console.log("Storage miss", postGuest_json);

			console.log("2da call", data);
			if(data["success"] == "false"){
				alert("Hubo un error en la creacion de la reserva. Sera remitido a la pagina principal");
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

async function fetchAsync_take_send_picture(url) {

		var postGuest = localStorage.postGuest;				
		var postGuest_json = JSON.parse(postGuest);
	
  let response = await fetch("http://127.0.0.1:5000/cam");
//  response = response.replace(/&quot;/ig,'"');
//  let flag = await response["sucess"];
	
	console.log("web cam",response);
	
	var guestID = postGuest_json.guestID;
	
	// Sending picture to cloudbed
	
	let response_web = await fetch(url+"D:/Projects/OpenCheck_restapi/data/photo/picture.png");
	
	console.log("uploading document",response_web);
	
	
	
}


async function fetchAsync_getAvailableRooms(url) {
	
	
		var postGuest_json = JSON.parse(localStorage.postGuest);
		
		
  		let response = await fetch(url);
		

		let data_request = await response.json();
		data = data_request["success"];
		
		console.log("request room  info ended");
	

		
		postGuest_json.availableRooms = data_request["availableRooms"];
		postGuest_json.rooms = data_request["rooms"];
		localStorage.postGuest = JSON.stringify(postGuest_json);

		console.log("available rooms", data_request["availableRooms"]);		
  		console.log("Rooms", data_request["rooms"]);		
		
		
			if(data === false){
			
			alert("Habitaciones no disponibles. Por favor, escoja otra fecha");
				
				
			
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
	
		
  		let response = await fetch(url,  {method: 'POST',   headers: {'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-lencoded',
    },body: data});
	
	
	
		
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
		   alert(data_request["message"]);
//		   	postGuest_json.balance = data_request["grandTotal"];
//		   postGuest_json.paid = 0;
//		   postGuest_json.total = data_request["grandTotal"];
			//window.location.href = "picking_date.html";
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
	
		
  		let response = await fetch(url,  {  
       method: 'GET',  
//       withCredentials: true,  
//       crossorigin: true,  
//       mode: 'cors',   
//		headers:{"Access-Control-Allow-Origin":"*"}
     }
								  );  

		response = response.json()
	
				console.log("llamada api de java", response);

		
   };  
	
	
	
async function fetchAsync_getScan(url) {
	

	
		var waitLogo = document.getElementById("waitLogo");
		waitLogo.style.opacity = "1";
	
		var scan_var = document.getElementById("scan");
		scan_var.style.opacity = "0";
	
		var atras = document.getElementById("atras");
		atras.style.opacity = "0";
	
		var frame = document.getElementById("frame");
		atras.style.opacity = "0";
	
  		let response = await fetch(url);

		console.log("Scanning");
	
	
	
		let data = await response.json();
		
		try {
		var success = data["status"];
		}
		catch(err) {
		var success = data["success"];
		}

	
		var success = data["success"];
	
  		console.log("Sucess",success);
	
  		var postGuest = localStorage.postGuest;				
		var postGuest_json = JSON.parse(postGuest);
	
	
		var request_info_json = data;

		postGuest_json.guestFirstName = request_info_json.mrzGivenname;// + " " + request_info_json.guestLastName;
		postGuest_json.guestLastName = request_info_json.mrzSurname;
		postGuest_json.startDate = request_info_json.startDate;
		postGuest_json.guestBirthDate = request_info_json.mrzBirthDate;
	
		postGuest_json.guestCountry = request_info_json.mrzNationality;
		postGuest_json.guestDocumentType = request_info_json.mrzDocType;
	
	
		postGuest_json.guestDocumentExpirationDate = request_info_json.mrzExpiryDate;
		postGuest_json.guestDocumentIssuingCountry = request_info_json.mrzIssueCountry;
		postGuest_json.guestDocumentNumber = request_info_json.mrzPersonalNumber;
		
		localStorage.setItem("postGuest", JSON.stringify(postGuest_json));
		console.log("mi_post",postGuest_json);
		


		waitLogo.style.opacity = "0";
		scan_var.style.opacity = "1";
		frame.style.opacity = "1";
		
		if(data["success"] === true){
			var guest2process_data = JSON.parse(localStorage.getItem("guest2process_data"));
			var header = document.getElementById("guest");  //header_14
			header.textContent = " Huespéd # "+ guest2process_data.i; 	
			window.location.href = "signature.html";}
		else{
		
			waitLogo.style.opacity = "0";
			scan_var.style.opacity = "1";
			frame.style.opacity = "1";

			
			var alerta = document.getElementById("alerta");
			alerta.style.opacity = "1";

			var error_scan_counter = JSON.parse(localStorage.getItem("error_scan_counter"));
			error_scan_counter += 1;

			localStorage.setItem('error_scan_counter', error_scan_counter);		

			if(error_scan_counter >3){

				var alerta_message = document.getElementById("alerta_message");
				var alerta = document.getElementById("alerta");
				alerta.style.opacity = "1";
				alerta_message.textContent = "Inserte manualmente su información personal. Número de intentos superados."
				var button_automatic_scan = document.getElementById("button_automatic_scan");
				button_automatic_scan.style.opacity = "0";
				}
			else{

				var alerta = document.getElementById("alerta");
				alerta.style.opacity = "1";
			}

			delay(5000).then(() => console.log('ran after 5 seconds passed'));
	
		}
	
		atras.style.opacity = "1";
	
		return "true";
	
	
};


async function fetchAsync_sendGmail() {
	
	var postGuest = localStorage.postGuest;				
	var postGuest_json = JSON.parse(postGuest);
	var reservationID = postGuest_json.reservationID;
	console.log("Reservation ", reservationID);
	 
	let response = await fetch("http://localhost:5000/sendEmail?reservationID="+reservationID, {method: 'GET'});

	return response

};

async function makePayment(url, data){
	
	var postGuest_json = JSON.parse(localStorage.postGuest);

	let response = await fetch(url,  {method: 'POST',   headers: {'Content-Type': 'application/json'},body: data});

};

async function fetchAsync_take_key(url, data){

	let response = await fetch(url,  {method: 'POST',   headers: {'Content-Type': 'application/json'},body: data});

	return response;
}
	 





		

		
	
