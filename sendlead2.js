

var hcgeo = "";
var offer_pp_id = ""; //flow id
var dboffer = "";
var price = '';
 
var sub1 = getUrlParam("utm_source");
console.log(sub1);

//var ktr_subid = getCookie("_subid") || getUrlParam("subid"); //token from cookie
var ktr_subid = getUrlParam("subid") || getUrlParam("_subid"); 


var fbpx = getUrlParam("fbpx");


if (!window.jQuery) {
	var jq = document.createElement('script');
	jq.type = 'text/javascript';
	jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
	document.getElementsByTagName('head')[0].appendChild(jq);
	jq.onload = function(){
		prepareForms();
	};
}else{
	prepareForms();
}

function prepareForms(){
   $( "form" ).each(function(){
		console.log("form found");
		$(this).attr("action", "#");
		$(this).removeAttr("onsubmit");
		$(this).submit(function (event) {
			console.log("submit");
			event.preventDefault();
			event.stopPropagation();
			
			var name = $(this).find("[name='name']").val() || $(this).find("[name='fio']").val() ||  $(this).find("[name='client']").val()  || "";
			var phone = $(this).find("[name='phone']").val() || $(this).find("[name='tel']").val()  || "";
			var geo = hcgeo || $(this).find("[name='geo']").val();
			
			var otherdata = {
				address: $(this).find('[name="other[address]"]').val() || "",
				city: $(this).find('[name="other[city]"]').val() || "",
				pcode: $(this).find('[name="other[pcode]"]').val() || $('[name="other[zipcode]"]').val() ||"",
				quantity: $(this).find('[name="other[quantity]"]').val() || "",
				note: $(this).find('[name="other[note]"]').val() || price || ""
			};
			
			if(name.length <= 1 || phone.length < 6){
				console.log("Check Form");
			}else{
				senddata(name, phone, geo, otherdata);
			}
		});	
	});
}

function addIframe(src){
    document.body.innerHTML = "";
    var elemDiv = document.createElement('iframe');
    //elemDiv.style.cssText = 'position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;';
    elemDiv.style.cssText = 'position:absolute; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;';
    elemDiv.src = src; 
    document.body.appendChild(elemDiv); // appends last of that element
}



function senddata(name, phone, geo, otherdata){
	var params = {
		name: name,
		phone: phone,
		geo: geo,
		dboffer: dboffer,
		offer_pp_id: offer_pp_id,
		ua: navigator.userAgent,
		ktr_subid: ktr_subid,
		sub1: sub1,
		otherdata: otherdata,
	};
	console.log(params);

	$.post("./order.php", params)
		.done(function (data) {
			console.log(data);
            if(data == "ok"){
 
				var refdom = getUrlParam("refdom");

				addIframe("https://fulll.fun/l/aretanaka-ru/success.php?fbpx=" + fbpx);

            	// if(refdom){
            	// 	var host = window.location.host;
            	// 	var curfullpath = window.origin + window.location.pathname;
            	// 	var newcurfullpath = curfullpath.replace(host, refdom);
            	// 	console.log(newcurfullpath);
            	// 	window.location.href=  newcurfullpath  + "success.php?fbpx=" + fbpx;
            	// }else{
            	// 	window.location.href="./success.php?fbpx=" + fbpx;
            	// }

                
            }else{
				alert("Something wrong! Please, check your form data and try again!");
			}
		});
}



function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function getUrlParam( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

var ip = "";
  jQuery.ajax ({
    type: "GET",
    url: "//api.sypexgeo.net/json/",
    dataType: "json",
    success: function(data) {
       var city = data.city.name_ru;
      var region = city;
      if (region == "")
      {jQuery(".geocity").text("Москва");}
      else {jQuery(".geocity").text(city);}
    },
    error: function() {
      jQuery(".geocity").text("Москва");
    }
  });
