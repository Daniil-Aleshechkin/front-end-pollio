import {createElementWithText, createElementWithClass, getCSSVariable} from "../../public/helpers"
import {polls} from "./input"

insertPolls(polls)

function insertPolls(polls) {
    let content = document.getElementsByClassName("main-content")[0]

    polls.forEach(poll => {
        let pollContainer = createElementWithClass("div", "poll")
        let pollInfo = createPollInfo(poll)

        let options = createOptions(poll.options)
        
        pollContainer.appendChild(pollInfo)
        pollContainer.appendChild(options)

        content.appendChild(pollContainer);
    });

    
}  

function createPollInfo(poll) {
    let pollInfo = createElementWithClass("div", "poll-info")
    console.log(poll, pollInfo);
    let title = createElementWithText("h3", poll.question);
    let date = createElementWithText("h3", Date.parse(poll.date).toLocaleString())

    pollInfo.appendChild(title);
    pollInfo.appendChild(date);
    
    return pollInfo;
}

function createOptions(options) {
    let pollOptions = document.createElement("div");
    pollOptions.className = "options";

    let max = options.reduce((currentMax, option) => {
        if (option.value > currentMax)
            currentMax = option.value;
    }, 0)

    options.forEach((option, index) => {
        let optionTitle = createElementWithText("h3",option.name);
        
        let optionBar = document.createElement("div");
        let pollBar = createElementWithClass("div", "poll-bar");
        pollBar.style.setProperty("--size", Math.round(option.value/max));
        pollBar.style.setProperty("background-color", getCSSVariable(`option-${index+1}-color`));
        optionBar.appendChild(pollBar);

        let optionVoteAmount = createElementWithClass("h3", "last-item").withText(option.value.toString());

        pollOptions.appendChild(optionTitle);
        pollOptions.appendChild(optionBar);
        pollOptions.appendChild(optionVoteAmount);
    })

    return pollOptions;
}