const getUserFriendlyName = {
    "email" : "Email",
    "password": "Password",
    "confirmPassword": "Confirm password",
    "username": "Username",
    "profile": "Profile"
}
document.getElementById("sign-up-form").addEventListener("submit", onFormSubmit)

function validateForm(form) {
    errors = getValidationErrors(form)

    if (errors.length != 0) {
        clear_errors()
        displayErrors(errors);
        return false
    } else {
        return true
    }
}

function onFormSubmit(e) {
    e.preventDefault()
    let signUpForm = document.getElementById("sign-up-form")
    if (!validateForm(signUpForm)) {
        e.preventDefault()
    }
}

function clear_errors() {
    Array.from(document.getElementsByClassName("error")).forEach(errorContainer => {errorContainer.replaceChildren()
        errorContainer.style["border"] = "none"
    })
}

function displayErrors(errors) {
    errors.forEach(error => {
        console.log(error)
        let errorContainer = document.getElementById(`${error.errorSource}-error`)

        let errorHeading = document.createElement("div");
        errorHeading.className= "error";
        let errorText = document.createTextNode(error.errorMessage);
        errorHeading.appendChild(errorText);

        errorContainer.style["border-bottom"] = "1px solid var(--danger-stroke-color)";
        errorContainer.appendChild(errorHeading);
    })
}

function getValidationErrors(form) {
    let errors = [];
    let inputs = form.getElementsByTagName("input");
    
    // All input fields must be filled out
    let unfilledFields = [];

    Array.from(inputs).forEach(input => {
        if (input.textLength <= 0){
            unfilledFields.push(getUserFriendlyName[input.name])
            errors.push({errorMessage: getUserFriendlyName[input.name]+" is required", errorSource: input.name})
        }
    });
    
    // Email must be less than 60 characters
    if (inputs["email"].textLength > 60 && inputs["email"].textLength !== 0)
        errors.push({errorMessage: "Maximum length of \"Email\" is 60 characters.", errorSource:"email"});

    // Email must be a valid email address
    if (!inputs["email"].value.match(/^[\w\.]+@[\w\.]+[\w]/) && inputs["email"].textLength !== 0)
        errors.push({errorMessage: "Please enter a valid email", errorSource: "email"})

    // Username must only contain alpha numeric characters
    if (!!inputs["username"].value.match(/[^0-9A-Za-z]/) && inputs["username"].textLength !== 0)
        errors.push({errorMessage: "Username must only contain alphanumeric characters.", errorSource: "username"});

    // Maximum length of username is 40 characters
    if (inputs["username"].textLength > 40 && inputs["username"].textLength !== 0)
        errors.push({errorMessage: "Maximum length of \"Username\" is 40 characters.", errorSource:"username"});

    // Password must contain letters and a digit
    if (!inputs["password"].value.match(/[a-zA-Z]/) || !inputs["password"].value.match(/\d/) && inputs["password"].textLength !== 0)
        errors.push({errorMessage:"Password must contain at least one number and letters", errorSource:"password"});
    
    // Password must be longer than 12 characters
    if (inputs["password"].textLength <= 12 && inputs["password"].textLength !== 0)
        errors.push({errorMessage:"Password must be longer than 12 characters", errorSource:"password"});

    // Confirm password and password must match
    if (inputs["password"].value != inputs["confirmPassword"].value && inputs["password"].textLength !== 0 && inputs["confirmPassword"].textLength !== 0)
        errors.push({errorMessage:"\"Confirm Password\" field and \"Password\" field must match.", errorSource:"confirmPassword"});

    return errors;
}