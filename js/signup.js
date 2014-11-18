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

function hideOrShow() {
        var other = document.getElementsByName("occupationOther")[0];
        if (occupation.value == "other") {
            other.style.display = "inline";
        } else {
            other.style.display = "none";
            other.value = '';
        }
    } //hideOrShow()

function leave() {
        var exit = window.confirm("Are you sure you want to exit?");
        if (exit == true) {
            window.location.href = "http://google.com";
        }
    } //leave()

function requiredField(field, form) {
        if (form[field].value.trim().length == 0) {
            form[field].className = 'invalid-field form-control';
            return false;
        } else {
            form[field].className = 'form-control';
            return true;
        }
    } //requiredField(field, form)

function zip(field, form) {
        var zipRegExp = new RegExp('^\\d{5}$');
        var zipCode = document.getElementsByName("zip")[0].value;
        if (zipRegExp.test(zipCode)) {
            form[field].className = 'form-control';
            return true;
        } else {
            form[field].className = 'invalid-field form-control';
            return false;
        }
    } //zip(field, form)

function birth(field, form) {
        var today = new Date();
        var dob = new Date(document.getElementById(field).value);
        var day = today.getDate() - dob.getUTCDate();
        var month = today.getMonth() - dob.getUTCMonth();
        var year = today.getFullYear() - dob.getUTCFullYear();

        if (month == 0 && day < 0 || month < 0) {
            year--;
        }
        if (year >= 13) {
            form[field].className = 'form-control';
            return true;
        } else {
            form[field].className = 'invalid-field form-control';
            document.getElementById("birthdateMessage").innerHTML = "This user must be 13 years or older to sign up";
            return false;
        }
    } // birth(field, form)

function onSubmit(page) {
        try {
            var valid = form(this);
            if (!valid && page.preventDefault) {
                page.preventDefault();
            }
            page.returnValue = valid;
            return valid;
        } catch (err) {
            alert("Exception: " + err);
        }
    } //onSubmit()

function form(form) {
        var fields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
        var valid = true;

        for (var id = 0; id < fields.length - 2; id++) {
            valid &= requiredField(fields[id], form);
        }
        valid &= zip(fields[5], form);
        valid &= birth(fields[6], form);

        if (occupation.value == "other") {
            valid &= requiredField("occupationOther", form);
        }

        return valid;
    } // form(form)

document.addEventListener('DOMContentLoaded', function() {
    getStates();
    occupation.addEventListener('change', hideOrShow);
    cancelButton.addEventListener('click', leave);
    var ourform = document.getElementById("signup");
    ourform.addEventListener('submit', onSubmit);
});