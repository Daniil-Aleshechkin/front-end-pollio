import {createElementWithText} from "../../public/helpers.js"

//TODO: Refactor validation code to helper functions

const getUserFriendlyName = {
    "email" : "Email",
    "password": "Password",
    "confirmPassword": "Confirm password",
    "username": "Username",
    "profile": "Profile"
}

document.getElementById("login-form").addEventListener("submit", onFormSubmit)

function onFormSubmit(e) {
    if(!validateForm(e.currentTarget)) {
        e.preventDefault();
    }
}

function validateForm(form) {
    let errors = getFormValidationErrors(form);
    
    if (errors.length > 0) {
        clearErrors();
        displayErrors(errors);
        return false;
    } else {
        return true;
    }
}


//TODO: Remove this code. This is temp code for required stuff in the assignment. Replace it with code that validates the login credentials
function getFormValidationErrors(form) {
    let errors = []

    let unfilledFields = []

    let inputs = form.getElementsByTagName("input");

    console.log(inputs)

    Array.from(inputs).forEach(input => {
        if (input.textLength <= 0){
            unfilledFields.push(getUserFriendlyName[input.name])
            errors.push({errorMessage: getUserFriendlyName[input.name]+" is required", errorSource: input.name})
        }
    });

    // Email must be a valid email address
    if (!inputs["email"].value.match(/^[\w\.]+@[\w\.]+[\w]/) && inputs["email"].textLength !== 0)
    errors.push({errorMessage: "Please enter a valid email", errorSource: "email"})

    // Password must be 8 characters
    if (inputs["password"].textLength !== 8 && inputs["password"].textLength !== 0)
    errors.push({errorMessage:"Password must be 8 characters", errorSource:"password"});

    return errors;
}

function displayErrors(errors) {
    errors.forEach(error => {
        console.log(error)
        let errorContainer = document.getElementById(error.errorSource+"-errors")
        
        errorContainer.appendChild(createElementWithText("p", error.errorMessage))
    })
}

function clearErrors() {
    Array.from(document.getElementsByClassName("errors")).forEach(error => error.replaceChildren())
}