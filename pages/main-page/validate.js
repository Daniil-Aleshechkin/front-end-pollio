import {createElementWithText} from "../../public/helpers.js"
import { onFormValidate } from "../../public/validate.js";

const getUserFriendlyName = {
    "email" : "Email",
    "password": "Password",
    "confirmPassword": "Confirm password",
    "username": "Username",
    "profile": "Profile"
}

document.getElementById("login-form").addEventListener("submit", onFormValidate(getFormValidationErrors))

//TODO: Remove this code. This is temp code for required stuff in the assignment. Replace it with code that validates the login credentials
function getFormValidationErrors(form) {
    let errors = []

    let unfilledFields = []

    let inputs = form.getElementsByTagName("input");

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