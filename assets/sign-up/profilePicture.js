import {createElementWithText} from "../../public/helpers.js"

let profileDropZone = document.getElementsByClassName("profile-preview")[0]
console.log(profileDropZone)
let profileInput = profileDropZone.nextElementSibling;

profileDropZone.addEventListener("dragover", e => {
    e.preventDefault()
    e.currentTarget.classList.add("profile-preview--over")
})

profileDropZone.addEventListener("dragend", e => {
    e.currentTarget.classList.remove("profile-preview--over")
})

profileDropZone.addEventListener("dragleave", e => {
    e.currentTarget.classList.remove("profile-preview--over")
})

profileDropZone.addEventListener("drop", e=> {
    e.preventDefault()
    console.log(e.dataTransfer.files)
    document.getElementById("profile-errors").replaceChildren()
    
    e.currentTarget.classList.remove("profile-preview--over")

    let errors = getFileValidationErrors(e.dataTransfer.files);

    if (errors.length > 0) {
        displayProfileInputErrors(errors)
        return
    }

    profileInput.files = e.dataTransfer.files

    updatePreview(e.currentTarget, e.dataTransfer.files[0])

})

function displayProfileInputErrors(errors) {
    errors.forEach(error => {
        document.getElementById("profile-error").appendChild(createElementWithText("p", error))
    })
}

function updatePreview(profileDropZone, file) {
    let profileThumbnail = profileDropZone.children[0];
    
    profileThumbnail.children[0].style.setProperty("display", "none")

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
        profileThumbnail.style.backgroundImage = `url(${reader.result})`
    }
}

function getFileValidationErrors(files) {
    let errors = []

    console.log(files[0].type)

    if (files.length > 1) {
        errors.push("Please only enter one file")   
    } else if (files[0].type.toString() !== "image/png" && files[0].type.toString() !== "image/jpeg"){
        errors.push("Please add a JPEG or PNG only")
    }

    return errors;
}