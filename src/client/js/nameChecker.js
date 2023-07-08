var labelId = document.getElementById("validationLabel");
var polarId = document.getElementById("polarId");
var subjId = document.getElementById("subjId");
var textId = document.getElementById("textId");

function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    // let names = [
    //     "Picard",
    //     "Janeway",
    //     "Kirk",
    //     "Archer",
    //     "Georgiou"
    // ]

    // if (names.includes(inputText)) {
    //     alert("Welcome, Captain!")
    // }

    if (inputText == null || inputText.length === 0) {
        if (labelId != null) {
            labelId.textContent = "Please enter a string or URL";
            labelId.style.color = "Red";
        }
        if (polarId != null) {
            polarId.textContent = "";
        }
        if (subjId != null) {
            subjId.textContent = "";
        }
        if (textId != null) {
            textId.textContent = "";
        }
        return false;
    }
    else {
        if (labelId != null) {
            labelId.textContent = "";
        }
        console.log("No input provided")
        return true;
    }
}

export { checkForName }