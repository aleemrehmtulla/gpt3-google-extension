// Listen for messages from contentScript.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // Extract the prompt from URL
    const url = request.data;
    const prompt = new URLSearchParams(new URL(url).search).get("q");
  
    // Replace `null` with your OpenAI API key. Grab it here: https://beta.openai.com/account/api-keys
    const API_KEY = null;
  
    // No point in fetching without an API key
    if (API_KEY === null) {
      sendResponse("No API key");
      return;
    }
  
    // Call OpenAI for a response
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-002",
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    })
      .then((response) => response.json())
      // Send the response back to contentScript.js
      .then((response) => sendResponse(response.choices[0].text))
      .catch(() => sendResponse("An error occurred while fetching the response from OpenAI."));
  
    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  });
  