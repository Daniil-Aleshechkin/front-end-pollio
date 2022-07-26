function validate(form, getValidationErrors) {
    let errors = getValidationErrors(form);

    if (errors.length !==0) {
        clearErrors();
        displayErrors(errors);
        return false;
    } else {
        return true;
    }
}

function displayErrors(errors) {
    errors.forEach(error => {
        console.log(error)
        let errorContainer = document.getElementById(error.errorSource+"-errors")

        let errorElement = document.createElement("p")
        let errorText = document.createTextNode(error.errorMessage);
        errorElement.appendChild(errorText);

        errorContainer.appendChild(errorElement)
    })
}

function clearErrors() {
    Array.from(document.getElementsByClassName("errors")).forEach(error => error.replaceChildren())
}

function onFormValidate(getValidationErrors) {
    return (e) => {
        if(!validate(e.currentTarget, getValidationErrors)) {
            e.preventDefault();
        }
    }
}

module.exports = {
    onFormValidate
};