function getCSSVariable(variableName) {
    return `var(--${variableName})`
}

function createElement(elementName) {
    let element = document.createElement(elementName);

    element.withText = (text) => {
        let textNode = document.createTextNode(text)
        element.appendChild(textNode)
        return element
    }

    element.withClass = (classname) => {
        element.className = classname
        return element
    }
    
    return element
}

function createElementWithClass(elementName, className) {
    let element = createElement(elementName).withClass(className)

    return element
}

function createElementWithText(elementName, text) {
    let element = createElement(elementName).withText(text);
    return element
}


//From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

module.exports = {
    getCSSVariable,
    createElementWithText,
    createElementWithClass,
    shuffle
}