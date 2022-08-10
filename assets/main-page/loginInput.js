

Array.from(document.getElementById("login-form").getElementsByClassName("box")[0].getElementsByTagName("input")).forEach(input => {
    input.addEventListener("focus", onFocus)
})

function onFocus(e) {
    let input = e.currentTarget
    let errors = input.previousElementSibling
    let loginErrors = input.parentElement.previousElementSibling;
    
    errors.replaceChildren()
    loginErrors.replaceChildren()
    
}