/* 
Develop by ITCS's Dveloper 
Reference
  - Stackoverflow
  - http://ramkulkarni.com/blog/encrypting-data-with-crypto-js-in-javascript/
  - https://code.google.com/archive/p/crypto-js/
  - https://developer.chrome.com/extensions/getstarted
*/

 var txtInputMessage   = document.getElementById('inputMessage');
 var txtOutputMessage  = document.getElementById('outputMessage');
 var txtKey            = document.getElementById('key');
 
 var lblShowError      = document.getElementById('showError');
 var btnEncrypt        = document.getElementById('btnEncrypt');
 var btnDecrypt        = document.getElementById('btnDecrypt');


window.addEventListener("load", function load(event){
	txtInputMessage.focus();
	if(GetCookie("myKey") != '')
	{
		txtKey.value = GetCookie("myKey");
	}
}, false);

btnEncrypt.addEventListener("click", function(){
	if(Validate()){
		SetCookie("myKey", txtKey.value, 7);
		Encrypt();
	}
});

btnDecrypt.addEventListener("click", function(){
	if(Validate()){
		SetCookie("myKey", txtKey.value, 7);
		Decrypt();
	}
});


function SetCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function GetCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');

	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


function Decrypt (){
	try{
		var hashedPassword = CryptoJS.SHA512(txtKey.value).toString(CryptoJS.enc.Hex);
		var decrypted      = CryptoJS.AES.decrypt(txtInputMessage.value, hashedPassword);

		txtOutputMessage.value  = decrypted.toString(CryptoJS.enc.Utf8);
	}catch (err){
		ClearInput ();
		ShowError('Error, Please Try Again.');
	}
}

function Encrypt (){
	try{
		var hashedPassword = CryptoJS.SHA512(txtKey.value).toString(CryptoJS.enc.Hex);
		var encryptedAES = CryptoJS.AES.encrypt(txtInputMessage.value, hashedPassword);

		txtOutputMessage.value = encryptedAES;
	}catch (err){
		ClearInput ();
		ShowError('Error, Please Try Again.');
	}
}

function ClearInput (){
	txtInputMessage.value  = '';
	txtOutputMessage.value = '';
}

function ShowError (msg)
{
	lblShowError.innerHTML = msg + '<br><br>';
}

function Validate()
{
	if(txtInputMessage.value === '')
	{
		ShowError('Please Input <u><b>Message</b></u>.');
		txtInputMessage.focus();
		return false;
	}

	if(txtKey.value === '')
	{
		ShowError('Please Input <u><b>Key</b></u>.');
		txtKey.focus();
		return false;
	}

	return true;
}