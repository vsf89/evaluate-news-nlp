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
    var labelId = document.getElementById("validationLabel");
    var polarId = document.getElementById("polarId");
    var subjId = document.getElementById("subjId");
    var textId = document.getElementById("textId");
    if (inputText == null || inputText.length === 0) {
        
        labelId.textContent = "Please enter a string or URL";
        labelId.style.color = "Red";
        polarId.textContent = "";
        subjId.textContent = "";
        textId.textContent = "";
        return false;
      //  alert('Please enter a string or URL');
        // return;        
    }
    else
    {
        labelId.textContent = "";
        return true;        
    }
}

export { checkForName }