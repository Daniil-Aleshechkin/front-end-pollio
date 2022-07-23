import * as poll from "./input.js"
import {createElementWithClass, createElementWithText} from "../../public/helpers"


addPoll(poll)

function addPoll(poll) {
    let pollForm = document.getElementById("poll");

    pollForm.appendChild(createElementWithText("h1", poll.question))

    let optionsBox = createElementWithClass("div", "box");

    poll.options.forEach(option => {
        let optionSelector = createElementWithClass("div","option").withText(option.name)
        optionSelector.addEventListener("click", onVoteSelect)
        optionsBox.appendChild(optionSelector)
        
        let input = document.createElement("input");
        input.style.setProperty("display", "none");
        input.value = option.name
        input.type = "radio"
        input.name = "vote"
        optionsBox.appendChild(input)
    });

    pollForm.appendChild(optionsBox);

    let submitButton = document.createElement("input")

    submitButton.value = "Save"
    submitButton.type = "submit"
    submitButton.className = "btn-common"

    pollForm.appendChild(submitButton)
}

function onVoteSelect(e) {
    let input = e.currentTarget
    
    if (!Array.from(input.classList).includes("selected")) {
        let otherSelection = document.getElementsByClassName("selected")
        if (otherSelection.length != 0) {
            otherSelection[0].classList.remove("selected")
        }
        
        input.classList.add("selected")
        input.nextElementSibling.checked = true
    }
        
 
}