import * as poll from "./input.js"
import {createElementWithText, createElementWithClass, getCSSVariable, getBaseURL} from "../../public/helpers.js"

//createResutls(poll)

function uploadResults(results) {
    let max = Math.max(...results.map(result => result.Votes));

    Array.from(document.getElementsByClassName("poll-bar")).forEach((pollBar,i) => {
        let size = Math.floor(results[i].Votes/max*100);

        if (size == 0) {
            size = 1
        }

        if (max == 0) {
            size = 100
        }

        if (size >=10) {
            pollBar.children[0].textContent = results[i].Votes
            pollBar.children[0].style.setProperty("display", "block")
            pollBar.previousElementSibling.style.setProperty("display","none")
        } else {
            pollBar.children[0].style.setProperty("display", "none")
            pollBar.previousElementSibling.textContent = results[i].Votes
            pollBar.previousElementSibling.style.setProperty("display","block")    
        }
        
        pollBar.style.setProperty("--size", size)
    })
}

function getResults(pollId) {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            uploadResults(JSON.parse(this.responseText).Options)
        }
    }

    xhttp.open("GET", getBaseURL()+`api/getResults.php?PollId=${pollId}`);
    xhttp.send();
}

setInterval(() => getResults(pollId), 10000)

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