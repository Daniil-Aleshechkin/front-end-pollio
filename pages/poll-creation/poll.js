import {createElementWithClass, createElementWithText} from "../../public/helpers"

const MINUS_SVG = "<svg xmlns\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M0 10h24v4h-24z\"/></svg>" 

document.getElementById("add-option-btn").addEventListener("click", onAdd)
document.getElementById("poll-title").children[0].addEventListener("click", onFocusOptionTitle)
document.getElementById("poll-title").children[1].addEventListener("keypress", onEnterKeyPress)
document.getElementById("poll-title").children[1].addEventListener("focusout", onSubmitOptionTitle)

function onTitleFocus(e) {
    let title = e.currentTarget;
    let titleInput = title.nextElementSibling;

    title.style.setProperty("display", "none")

    titleInput.value = title.textContent

    titleInput.style.setProperty("display", "block")
}

let optionAmount = 1;

addPollOption()

function onAdd(e) {
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
    optionTitle.addEventListener("click", onFocusOptionTitle);
    
    option.appendChild(optionTitle)
    
    option.appendChild(createInputBox())
    
    option.insertAdjacentHTML("beforeend", MINUS_SVG)
    
    option.children[2].addEventListener("click", onDelete)

    pollOptionsContainer.appendChild(option)
}

function createInputBox() {
    let input = document.createElement("input")
    input.style.setProperty("display", "none")
    console.log(optionAmount)
    input.name = `option${optionAmount.toString()}`
    input.addEventListener("focusout", onSubmitOptionTitle)
    input.addEventListener("keypress", onEnterKeyPress)
    return input
}

function onEnterKeyPress(e) {
    if (e.key === "Enter") {
        onSubmitOptionTitle(e)
    }
}

function onSubmitOptionTitle(e) {
    console.log(e)
    let input = e.currentTarget;
    let optionTitle = input.previousElementSibling;

    if (input.value !== "") {
        optionTitle.textContent = input.value
    }

    optionTitle.style.setProperty("display", "block")
    input.style.setProperty("display", "none")
}

function onFocusOptionTitle(e) {
    let option = e.currentTarget;
    let input =  option.nextElementSibling;
    
    input.style.setProperty("display", "block")
    input.focus()
    input.value = option.textContent;

    if (input.value == "Click to edit") {
        input.select()
    }

    option.style.setProperty("display", "none")
}


function onDelete(e) {
    e.currentTarget.parentElement.outerHTML = ""

    if (optionAmount === 5) {
        document.getElementById("add-option-btn").style.setProperty("display", "block")
    }

    optionAmount = optionAmount - 1

    
}

