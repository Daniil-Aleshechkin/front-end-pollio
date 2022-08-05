import * as poll from "./input.js"
import {createElementWithText, createElementWithClass, getCSSVariable} from "../../public/helpers.js"

//createResutls(poll)


function createResutls(poll) {
    let results = document.getElementById("results")
    let pollOptions = createOptions(poll.options);

    results.appendChild(createElementWithText("h1", poll.question))
    results.appendChild(pollOptions)
}

function createOptions(options) {
    let pollOptions = document.createElement("div");
    pollOptions.className = "options";

    let max = options.reduce((currentMax, option) => {
        if (option.value > currentMax)
            return option.value;
        else {
            return currentMax
        }
    }, 0)

    options.forEach((option, index) => {
        let optionContainer = createElementWithClass("div", "option");
        let pollBarContainer = document.createElement("div");

        let optionVoteAmount = createElementWithText("p",option.value.toString());

        let optionBar = document.createElement("div");
        let size = option.value/max*100
        
        let pollBar = createElementWithClass("div", "poll-bar");
        pollBar.style.setProperty("--size", Math.round(size));
        pollBar.style.setProperty("background-color", getCSSVariable(`option-${index+1}-color`));
        optionBar.appendChild(pollBar);

        let optionTitle = createElementWithText("h3",option.name);

        if (size < 10) {
            optionContainer.appendChild(optionVoteAmount);
        } else {
            pollBar.appendChild(optionVoteAmount);
        }
        pollBarContainer.appendChild(pollBar)
        optionContainer.appendChild(pollBarContainer)
        optionContainer.appendChild(optionTitle)
        pollOptions.appendChild(optionContainer);
    })

    return pollOptions;
}