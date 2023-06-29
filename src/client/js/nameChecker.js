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
        alert('Please enter a string or URL');
        return;
    }
}

export { checkForName }