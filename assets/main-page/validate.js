import {createElementWithText} from "../../public/helpers.js"
import { onFormValidate } from "../../public/validate.js";

document.getElementById("login-form").addEventListener("submit", onFormValidate(getFormValidationErrors))