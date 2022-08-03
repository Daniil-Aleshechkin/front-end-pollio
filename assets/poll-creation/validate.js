import {createElementWithText} from "../../public/helpers.js"
import {onFormValidate} from "../../public/validate.js" 

document.getElementById("poll-creation-form").addEventListener("submit", onFormValidate(getFormValidationErrors))

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

        if (option.value.length >= 50) {
            errors.push({errorMessage:"Options must be lower than 50 characters", errorSource: option.parentElement.id})
        }
    })

    if (options.length === 0 || options.length === 1) {
        errors.push({errorMessage: "You must have at least 2 options for the poll", errorSource: "poll"})
    }

    return errors;
}