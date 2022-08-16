import * as poll from "./input.js"
import {createElementWithClass, createElementWithText, getBaseURL} from "../../public/helpers"


//addPoll(poll)

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
    if (voted) {return }

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

let voted = false;

function onVoteSubmit(e) {
    e.preventDefault();
    
    const voteData = new FormData();
    voteData.append("vote",e.currentTarget.getElementsByClassName("selected")[0].nextElementSibling.value);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("submit-btn").style.setProperty("display", "none")
            voted = true;
            document.getElementById("view-results-link").style.setProperty("display", "block")
        }
    }
    console.log(e.currentTarget.getAttribute("action"))
    xhttp.open("POST", e.currentTarget.getAttribute("action"), true);
    xhttp.send(voteData);
}

document.getElementById("voteForm").addEventListener("submit", onVoteSubmit)

Array.from(document.getElementsByClassName("option")).forEach(option => option.addEventListener("click", onVoteSelect))