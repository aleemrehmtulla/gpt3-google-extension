(() => {
    // create the div element & label element 🤘
    const infoDiv = document.createElement("div");
    infoDiv.className = "gpt3-info";
    infoDiv.style = `
      background-color: #303135;
      padding: 30px;
      border-radius: 5px;
      color: #ffffff;
      font-size: 24px;
      font-weight: bold;
      margin: 20px 0px;
      width: 45%;
    `;
  
    // create the button element
    const showAnswerBtn = document.createElement("button");
    showAnswerBtn.innerText = "Show Answer";
    showAnswerBtn.style = `
      background-color: #1c1e21;
      color: #ffffff;
      font-size: 24px;
      font-weight: bold;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
      border: none;
      cursor: pointer;
      display: block;
      margin: auto;
    `;
  
    // ping background.js to call openai & get the answer 🧠
    function getAnswer(response) {
      chrome.runtime.sendMessage({ data: window.location.href }, (response) => {
        if (response && response !== "No API key") {
          // if all is good, add the answer to the div 🏎
          infoDiv.innerHTML = `
            GPT-3 Answer
            <h1 style="padding-top: 20px;">${response}</h1>
          `;
        } else {
          alert(
            "No response from OpenAI. Ensure you have a key in `background.js`! Feel free to msg @aleemrehmtulla on Twitter for any help :)"
          );
        }
      });
    }
  
    // attach click event listener to the button
    showAnswerBtn.addEventListener("click", getAnswer);
  
    // add the button to the infoDiv
    infoDiv.appendChild(showAnswerBtn);
  
    // define where to place the box & inject in the dom 🥊
    const placementDiv = document.querySelector(".appbar");
    placementDiv.appendChild(infoDiv);
  })();
  