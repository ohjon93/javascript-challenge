/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

function getStates() {
	var element = document.getElementsByName("state")[0];
	for (var i = 0; i < usStates.length; i++) {
		var opt = document.createElement("option");
		opt.value = usStates[i].code;
		var text = document.createTextNode(usStates[i].name);
		opt.appendChild(text);
		element.appendChild(opt);
	}
} //getStates()

function hideShowOccupation() {
	var other = document.getElementsByName("occupationOther")[0];
	if(occupation.value == "other") {
		other.style.display = "inline";
	} else {
		other.style.display = "none";
		other.value = '';
	}
} //hideShowOccupation()

function leave() {
	var exit = window.confirm("Do you really want to leave?");
	if (exit == true) {
		window.location.href = "http://google.com";
	}
} //leave()

function validateForm(form) {
	var fields =['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	var valid = true;
	
	for (var id = 0; id < fields.length - 2; id++) {
		valid &= validateRequiredField(fields[id], form);
	}
	valid &= validateZip(fields[5], form);
	valid &= validateBirth(fields[6], form);
	
    if (occupation.value == "other") {
        valid &= validateRequiredField("occupationOther", form);
    }
    
	return valid;
} // validateForm(form)

function validateRequiredField(field, form) {
	if (form[field].value.trim().length == 0) {
		form[field].className = 'invalid-field form-control';
		return false;
	} else {
		form[field].className = 'form-control';
		return true;
	}
} //validateRequiredFIeld(field, form)
	
function validateZip(field, form) {
	var zipRegExp = new RegExp('^\\d{5}$');
	var zipCode = document.getElementsByName("zip")[0].value;
	if(zipRegExp.test(zipCode)) {
		form[field].className = 'form-control';
		return true;
	} else {
		form[field].className = 'invalid-field form-control';
		return false;
	}
} //validateZip(field, form)

function validateBirth(field, form) {
    var today = new Date();
    var dob = new Date(document.getElementById(field).value);
    var day = today.getDate() - dob.getUTCDate();
    var month = today.getMonth() - dob.getUTCMonth();
	var year = today.getFullYear() - dob.getUTCFullYear();
    
    if (month < 0 || (month == 0 && day < 0)) {
        year = year - 1;
    }
    
    if (year >= 13) {
		form[field].className = 'form-control';
		return true;
	} else {
		form[field].className = 'invalid-field form-control';
        document.getElementById("birthdateMessage").innerHTML = "This user must be 13 years or older to sign up";
		return false;
	}
} // validateBirth(field, form)

function onSubmit(evt) {
	try {
	    var valid = validateForm(this);
		if (!valid && evt.preventDefault) {
			evt.preventDefault();
		}
		
		evt.returnValue = valid;
		return valid;
	} catch(err) {
		alert("Exception: " + err);
	}
} //onSubmit()

document.addEventListener('DOMContentLoaded', function() {
	getStates();
	occupation.addEventListener('change', hideShowOccupation);
	cancelButton.addEventListener('click', leave);
	var ourform = document.getElementById("signup");
	ourform.addEventListener('submit', onSubmit);
});
