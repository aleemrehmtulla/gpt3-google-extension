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

  // replace `null` with your OpenAI API key. grab it here: https://beta.openai.com/account/api-keys
  const API_KEY = null;

  // no point in fetching without an API key 😜
  if (API_KEY === null) {
    sendResponse("No API key");
    return;
  }

  // call openai for a response 🤠
  fetch("https://api.openai.com/v1/chat/completions", {
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // If you have GPT-4 Beta access, turn this to "gpt-4"!
      messages: [{"role":"system", "content":"You are GPTForGoogle. Respond as concisely as possible. Read the user instructions carefully."}},{"role": "user", "content": prompt}]
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        // add your api key from openai.com here
        // keeping in plaintext as this is just for personal use
        // don't push to github like this ;)
        `Bearer ${API_KEY}`,
    },
    method: "POST",
  })
    .then((response) => response.json())
    // send the response back to contentScript.js 📬
    .then((response) => sendResponse(response.choices[0].text))
    .catch();
  return true;
});
