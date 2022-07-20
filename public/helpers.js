function getCSSVariable(variableName) {
    return `var(--${variableName})`
}

function createElementWithText(elementName, text) {
    let element = document.createElement(elementName)

    let textNode = document.createTextNode(text)

    element.appendChild(textNode)

    return element
}

module.exports = {
    getCSSVariable,
    createElementWithText
}