
const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),




selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
      
      
        let selected = "";
        if (id === 0) {
            if (country_code === "en-GB") {
                selected = "selected";
            }
        } else if (country_code === "hi-IN") {
            selected = "selected";
        }
          // let selected = id == 0 ? (country_code == "en-GB" ? "selected" : "") : country_code == "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});



// // Adding an event listener to the element with ID "exchangeIcon"
// exchangeIcon.addEventListener("click", () => {
//     // Storing the value of the 'fromText' input field in 'tempText'
//     let tempText = fromText.value,
    
//     // Storing the value of the first option in the 'selectTag' dropdown in 'tempLang'
//     tempLang = selectTag[0].value;
    
//     // Swapping the values of the 'fromText' and 'toText' input fields
//     fromText.value = toText.value;
//     toText.value = tempText;

//     // Swapping the values of the first and second options in the 'selectTag' dropdown
//     selectTag[0].value = selectTag[1].value;
//     selectTag[1].value = tempLang;
// });
exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;

    
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

// fromText.addEventListener("keyup", () => {
//     if(!fromText.value) {
//         toText.value = "";
//     }
// });

// translateBtn.addEventListener("click", () => {
//     let text = fromText.value.trim(),
//     translateFrom = selectTag[0].value,
//     translateTo = selectTag[1].value;
//     if(!text) return;
//     toText.setAttribute("placeholder", "Translating...");
//     let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
//     fetch(apiUrl).then(res => res.json()).then(data => {
//         toText.value = data.responseData.translatedText;
//         data.matches.forEach(data => {
//             if(data.id === 0) {
//                 toText.value = data.translation;
//             }
//         });
//         toText.setAttribute("placeholder", "Translation");
//     });
// });

translateBtn.addEventListener("click", () => {
    // Get values from input fields and dropdowns
    let text = fromText.value.trim();
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;

    // Check if 'text' is not empty
    if (!text) return;

    // Set a temporary message while translating
    toText.setAttribute("placeholder", "Translating...");

    // Create an API URL for translation
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    // Fetch data from the translation API
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            // Set the translated text in 'toText' input field
            toText.value = data.responseData.translatedText;

            // Check if there are additional translation matches
            data.matches.forEach(data => {
                if (data.id === 0) {
                    toText.value = data.translation;
                }
            });

            // Set back the placeholder text
            toText.setAttribute("placeholder", "Translation");
        });
});

// Assuming 'icons' is an array of icons, and each icon has an ID ('from' or 'to')
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        // Check if both input fields have text
        if (!fromText.value || !toText.value) return;

        // Check if the clicked icon is the 'copy' icon
        if (target.classList.contains("fa-copy")) {
            // Copy the text to the clipboard based on the clicked icon ('from' or 'to')
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            // Speak the text based on the clicked icon ('from' or 'to')
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});


