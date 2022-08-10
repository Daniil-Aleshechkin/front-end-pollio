import {capitalize, getCSSVariable,createElementWithClass, createElementWithText} from "../../public/helpers"

const MINUS_SVG = "<svg xmlns\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M0 10h24v4h-24z\"/></svg>" 

document.getElementById("add-option-btn").addEventListener("click", onAdd)
document.getElementById("poll-title").children[0].addEventListener("click", onFocus("Poll title"))
document.getElementById("poll-title").children[1].addEventListener("keypress", onEnterKeyPress)
document.getElementById("poll-title").children[1].addEventListener("focusout", onSubmitOptionTitle)
document.getElementById("poll-title").getElementsByTagName("input")[0].addEventListener("input",onInput(100))

let optionAmount = 0;
let optionId = 0;

addPollOption()

optionAmount = 1;

function onAdd(e) {
    
    document.getElementById("poll-errors").replaceChildren()

    addPollOption()

    optionAmount += 1

    if (optionAmount === 5) {
        e.currentTarget.style.setProperty("display", "none")
    }
}

function addPollOption() {
    let pollOptionsContainer = document.getElementById("option-container")
    
    let option = createElementWithClass("div", "option")

    let optionTitle = createElementWithText("p","Click to edit");
    optionTitle.addEventListener("click", onFocus("Click to edit"));
    
    option.appendChild(optionTitle)
    
    option.appendChild(createInputBox())

    let errorContainer = createElementWithClass("div", "errors")
    errorContainer.id = `option-${(optionId+1).toString()}-errors`
    option.id = `option-${(optionId+1).toString()}`
    optionId = optionId + 1

    pollOptionsContainer.appendChild(errorContainer)
    
    option.appendChild(createElementWithClass("p", "character-count"))

    option.insertAdjacentHTML("beforeend", MINUS_SVG)
    
    option.children[3].addEventListener("click", onDelete)

    pollOptionsContainer.appendChild(option)
}

function onInput(maxCharacter) {

    return (e) => {
        let input = e.currentTarget;
        let count = input.nextElementSibling;
        
        count.textContent = input.value.length.toString();
    
        if (input.value.length >= maxCharacter) {
            count.style.setProperty("color", getCSSVariable("danger-color"))
        } else {
            count.style.setProperty("color", "white")
        }
    }

}

function createInputBox() {
    let input = document.createElement("input")

    input.style.setProperty("display", "none")
    input.name = `option${optionAmount.toString()}`
    input.addEventListener("focusout", onSubmitOptionTitle)
    input.addEventListener("keypress", onEnterKeyPress)
    input.addEventListener("input", onInput(50))

    return input
}

function onEnterKeyPress(e) {
    if (e.key === "Enter") {
        onSubmitOptionTitle(e)
        e.preventDefault()
    }
}

function onSubmitOptionTitle(e) {
    let input = e.currentTarget;
    let optionTitle = input.previousElementSibling;

    if (input.value !== "") {
        optionTitle.textContent = capitalize(input.value)
    }

    optionTitle.style.setProperty("display", "block")
    input.style.setProperty("display", "none")
}

function onFocus(defaultValue) {
    return (e) => {
        let option = e.currentTarget;
        let input =  option.nextElementSibling;
        
        input.style.setProperty("display", "block")
        input.focus()
        input.value = option.textContent;
    
        if (input.value == defaultValue) {
            input.select()
        }
        
        input.parentElement.previousElementSibling.replaceChildren()    
        
        option.style.setProperty("display", "none")
    }
}


function onDelete(e) {
    let option = e.currentTarget.parentElement
    option.previousElementSibling.outerHTML = ""
    option.outerHTML = ""

    if (optionAmount === 5) {
        document.getElementById("add-option-btn").style.setProperty("display", "block")
    }

    optionAmount = optionAmount - 1
}
