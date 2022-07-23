import {createElementWithText, createElementWithClass, getCSSVariable} from "../../public/helpers"
import {polls} from "./input"

insertPolls(polls)

function insertPolls(polls) {
    let content = document.getElementsByClassName("main-content")[0]

    polls.forEach(poll => {
        let pollContainer = createElementWithClass("div", "poll")
        let pollInfo = createPollInfo(poll)

        let pollView = createElementWithClass("div", "poll-view");

        let options = createOptions(poll.options)
        let controls = createBtnControls();
        let mobileDate = createMobileDate(poll.date);

        pollContainer.appendChild(pollInfo)
        
        pollView.appendChild(options)
        pollView.appendChild(mobileDate)
        pollView.appendChild(controls)

        pollContainer.appendChild(pollView);
        
        content.appendChild(pollContainer);
    });

    
}  

function createPollInfo(poll) {
    let pollInfo = createElementWithClass("div", "poll-info")
    console.log(poll, pollInfo);
    let title = createElementWithText("h3", poll.question);
    let date = createElementWithText("h3", (new Date(poll.date)).toLocaleDateString())

    pollInfo.appendChild(title);
    pollInfo.appendChild(date);

    pollInfo.addEventListener("click", onPollClick)
    
    return pollInfo;
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
        let optionTitle = createElementWithText("h3",option.name);
        
        let optionBar = document.createElement("div");
        let pollBar = createElementWithClass("div", "poll-bar");
        pollBar.style.setProperty("--size", Math.round(option.value/max*100));
        pollBar.style.setProperty("background-color", getCSSVariable(`option-${index+1}-color`));
        optionBar.appendChild(pollBar);

        let optionVoteAmount = createElementWithClass("h3", "last-item").withText(option.value.toString());

        pollOptions.appendChild(optionTitle);
        pollOptions.appendChild(optionBar);
        pollOptions.appendChild(optionVoteAmount);
    })

    return pollOptions;
}

function createBtnControls() {
    let btnControl = createElementWithClass("div", "btn-control");
    
    let deleteBtn = createElementWithClass("div", "btn-danger").withText("Delete");
    let shareBtn = createElementWithClass("a", "btn-common").withText("Share").withAttribute("href", "/~dsa005/pollio/poll_vote");
    let resultsBtn = createElementWithClass("a", "btn-common").withText("Results").withAttribute("href", "/~dsa005/pollio/poll_results");

    btnControl.appendChild(deleteBtn)
    btnControl.appendChild(shareBtn)
    btnControl.appendChild(resultsBtn)

    return btnControl
}

function createMobileDate(date) {
    return createElementWithText("h3", (new Date(date)).toLocaleDateString()).withClass("mbl-date")
}

function onPollClick(e) {
    let poll = e.currentTarget.parentElement.getElementsByClassName("poll-view")[0];

    console.log(poll.style.display)
    if(poll.style.display=="none" || poll.style.display =="") {
        poll.style.setProperty("display", "block")
    } else {
        poll.style.setProperty("display","none")
    }
}