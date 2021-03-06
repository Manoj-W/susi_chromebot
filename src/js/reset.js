/* global $ */
var resetForm = document.getElementById("resetForm");
var notResetBlock = document.getElementById("notreset");
var resetBlock = document.getElementById("reset");
var BASE_URL = "https://api.susi.ai";

window.onload = function(){
	showResetBlock(true);
};

function showResetBlock(show){
	if(show) {
		notResetBlock.style.display="block";
		resetBlock.style.display="none";
	}
	else{
		resetBlock.style.display="block";
		notResetBlock.style.display="none";
	}
}

resetForm.addEventListener("submit", function reset(event){
	event.preventDefault();
	var email=document.getElementById("email").value;
	$("#resetbutton").button("Loading...");
	var resetPasswordEndPoint = BASE_URL+"/aaa/recoverpassword.json?forgotemail="+ encodeURIComponent(email);
	$.ajax({
		url: resetPasswordEndPoint,
		dataType: "jsonp",
		jsonpCallback: "p",
		jsonp: "callback",
		crossDomain: true,
		success: function (response) {
			if(response.accepted){
				alert(response.message);
				showResetBlock(false);
			}
		},
		error: function (jqXHR) {
			var msg = "";
			console.log(jqXHR);
			var jsonValue =  jqXHR.status;
			if (jsonValue === 404) {
				msg = "Reset Password Failed. Try Again";
			}
			alert(msg);
		}
	});
});
