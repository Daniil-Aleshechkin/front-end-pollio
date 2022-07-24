import {createElementWithClass, createElementWithText} from "../../public/helpers.js"

const monthTitles = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

Array.from(document.getElementsByClassName("date-container")).forEach(container => {
    container.getElementsByTagName("svg")[0].addEventListener("click", onOpenCalender)
})

function onOpenCalender(e) {
    let calenderButton = e.currentTarget;
    let input = calenderButton.nextElementSibling

    Array.from(document.getElementsByClassName("calender")).forEach(calender => {
        calender.outerHTML = ""
    })

    let date = input.value

    if (date === "") {
        date = new Date()
    }

    calenderButton.parentElement.appendChild(createCalander(new Date(date)));
}

function createCalander(date) {
    let calanderYear = date.getFullYear();
    let calanderMonth = date.getMonth();

    let calander = createElementWithClass("div", "box calender");

    let calanderHeading = createElementWithClass("div", "heading");
    
    calanderHeading.replaceChildren(...createCalenderHeading(calanderYear, calanderMonth, date))

    let calanderDates = createElementWithClass("div", "calender-dates");

    calanderDates.replaceChildren(...createCalanderDayTitles().concat(createCalanderDates(calanderYear, calanderMonth, date)));

    let calanderCloseButton = createElementWithText("p", "X").withClass("close");
    calanderCloseButton.addEventListener("click", onCalenderClose)

    calander.appendChild(calanderCloseButton)
    calander.appendChild(calanderHeading);
    calander.appendChild(calanderDates);

    return calander;
}

function createCalenderHeading(year, month, date) {
    let calanderHeading = []

    let calanderRightButton = createElementWithText("h3", ">")
    let calanderTitle = createElementWithText("h3", `${monthTitles[month]} ${year.toString()}`);
    let calanderLeftButton = createElementWithText("h3", "<")

    calanderRightButton.addEventListener("click", onMonthSelect(month+1, year))
    calanderLeftButton.addEventListener("click", onMonthSelect(month-1,year))

    calanderHeading.push(calanderLeftButton);
    calanderHeading.push(calanderTitle);
    calanderHeading.push(calanderRightButton);

    return calanderHeading;
}

function createCalanderDates(year, month, date) {
    
    let calanderDays = []
    
    let maxDaysOfCalander = (new Date(year, month + 1, 0)).getDate();
    let dayOfWeekOfFirstDay = (new Date(year, month, 1)).getDay();
    let dayOfWeekOfLastDay = (new Date(year, month, maxDaysOfCalander)).getDay()
    let maxDayOfPreviousMonth = (new Date(year, month, 0)).getDate();

    for (let offset = dayOfWeekOfFirstDay; offset > 0 ; offset--) {
        calanderDays.push(createCalanderDate(new Date(year, month-1, maxDayOfPreviousMonth-offset), date))
    }

    for (let day = 1; day <= maxDaysOfCalander; day++) {
        calanderDays.push(createCalanderDate(new Date(year, month,day), date))
    }

    for (let day = 1; day < 7- dayOfWeekOfLastDay; day++) {
        calanderDays.push(createCalanderDate(new Date(year, month+1, day), date))
    }

    return calanderDays;
}

function createCalanderDayTitles() {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    let dayTitles = []

    daysOfWeek.forEach(dayOfWeek => {
        dayTitles.push(createElementWithText("p",dayOfWeek))
    })

    return dayTitles
}

function createCalanderDate(date, selectedDate) {
    let calanderDate = createElementWithText("p", formatDate(date.getDate())).withClass("date")

    calanderDate.addEventListener("click", onSelect(date))

    if (date.getTime() === selectedDate.getTime()) {
        calanderDate.classList.add("selected")
    }

    return calanderDate;
}

function formatDate(date) {
    if (date < 10) {
        return `0${date}`
    } else {
        return date.toString()
    }
}

function onSelect(date) {
    return (e) => {
        let currentSelected = document.getElementsByClassName("calender")[0].getElementsByClassName("selected")

        if (currentSelected.length !== 0) {
            currentSelected[0].className = e.currentTarget.className
        }


        let input = e.currentTarget.parentElement.parentElement.parentElement.getElementsByTagName("input")[0]
        
        let dateDisplay = input.previousElementSibling.previousElementSibling;

        if (Array.from(e.currentTarget.classList).includes("selected")) {
            dateDisplay.textContent = ""

            input.value = ""
            
            e.currentTarget.className = "date"

        } else {
            dateDisplay.textContent = date.toLocaleDateString()

            input.value = date.toISOString();
            
            e.currentTarget.classList.add("selected")
        }    
    }
}

function onMonthSelect(newMonth, newYear) {

    if (newMonth === -1) {
        newMonth = 11
        newYear = newYear - 1
    }

    if (newMonth === 12) {
        newMonth = 0
        newYear = newYear + 1
    }

    return function selectMonth(e) {
        let heading = e.currentTarget.parentElement;
        let input = heading.parentElement.parentElement.getElementsByTagName("input")[0]
        let calenderDates = heading.nextElementSibling
        calenderDates.replaceChildren(...createCalanderDayTitles().concat(createCalanderDates(newYear, newMonth, new Date(input.value))))

        heading.replaceChildren(...createCalenderHeading(newYear, newMonth, new Date(input.value)))
    }
}

function onCalenderClose(e) {
    document.getElementsByClassName("calender")[0].outerHTML = "";
}