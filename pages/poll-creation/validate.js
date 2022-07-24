import {createElementWithText} from "../../public/helpers.js"

document.getElementById("poll-creation-form").addEventListener("submit", onFormSubmit)

function onFormSubmit(e) {
    e.preventDefault();
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

function getFormValidationErrors(form) {
    let errors = []

    let title = form.pollTitle;
    
    if (title.value === "Poll title" || title.value === "") {
        errors.push({errorMessage: "Please enter a title", errorSource: "poll-title"})
    }

    if (title.value.length >= 100) {
        errors.push({errorMessage:"Title must be smaller than 100 characters", errorSource:"poll-title"})
    }

    let options = Array.from(form.getElementsByTagName("input")).filter(input => !!input.name.match(/option/))

    options.forEach((option) => {
        if (option.value === "Click to edit" || option.value === "") {
            errors.push({errorMessage: "You must provide a name for this option", errorSource: option.parentElement.id})
        }

        if (option.value.length >= 50) {
            errors.push({errorMessage:"Options must be lower than 50 characters", errorSource: option.parentElement.id})
        }
    })

    if (options.length === 0 || options.length === 1) {
        errors.push({errorMessage: "You must have at least 2 options for the poll", errorSource: "poll"})
    }

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