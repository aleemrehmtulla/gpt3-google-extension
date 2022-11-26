# gpt3-google-extension 🧐

## What is this?

gpt3-google-extension is an lil tool that'll pop a box on you're google searches with direct answers

## Why did I build this?

i asked google `how muscles work`

google then told me... muscles let you move with percision 🤦🏽‍♂️

openai's gpt-3 is capable of giving much better and direct answers

-> what if we could have a gpt-3 generated answer on our searches! 

-> that's what this is ;)

## Demo!

https://user-images.githubusercontent.com/60443878/197319074-5f5b51f4-1b89-4237-9999-c8bd61e28cd5.mp4


## Usage 🤝

1. clone this repo
2. add you openai API key in `background.js`
3. head to `chrome://extensions`
4. hit `developer mode` in top right
5. add the root of this repo in `load unpacked extension`

## For development 🧑‍💻

this is a **super** small & simple build. 

`background.js` -> calls api

`manifest.json` -> chrome extension config

`contentScript.js` -> onload, put the answer in DOM

### Notes

- Built this in like an hour, just a fun hack, nothing serious 
- If ya have any ideas, throw up a PR or dm me :))

## Connect with me 🤗

https://twitter.com/aleemrehmtulla

https://aleemrehmtulla.com

https://www.linkedin.com/in/aleemrehmtulla/
