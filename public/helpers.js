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

    element.withAttribute = (attributeName, attributeValue) => {
        element.setAttribute(attributeName, attributeValue)
        return element
    }
    
    return element
}

function capitalize(str) {
    str = str[0].toUpperCase() + str.slice(1);
    return str;
}

function createElementWithClass(elementName, className) {
    let element = createElement(elementName).withClass(className)

    return element
}

function createElementWithText(elementName, text) {
    let element = createElement(elementName).withText(text);
    return element
}

const ISDEV = false;

function getBaseURL() {
    return ISDEV ? "http://localhost:8000/" : "http://webdev.uregina.ca/~dsa005/"
}

module.exports = {
    getCSSVariable,
    createElementWithText,
    createElementWithClass,
    capitalize,
    getBaseURL
}