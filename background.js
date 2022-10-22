// we can't call api directly from contentScript.js, so instead wait
// for when contentScript.js sends a message to background.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // extract the prompt from url 🔗
  // ~ broke step by step to understand what's going on ~
  const url = request.data;
  const step1 = url.split("?")[1];
  const step2 = step1.split("=")[1];
  const step3 = step2.split("+");
  const step4 = step3.join(" ");
  const prompt = step4.split("&")[0];

  // call openai for a response 🤠
  fetch("https://api.openai.com/v1/completions", {
    body: JSON.stringify({
      model: "text-davinci-002",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        // add your api key from openai.com here
        // keeping in plaintext as this is just for personal use
        // don't push to github like this ;)
        "Bearer [YOUR_API_KEY]",
    },
    method: "POST",
  })
    .then((response) => response.json())
    // send the response back to contentScript.js 📬
    .then((response) => sendResponse(response.choices[0].text))
    .catch();
  return true;
});
