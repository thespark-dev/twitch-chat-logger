# twitch-chat-logger
Logs the Twitch Chat to a .txt file.

# Install
You probably know the drill...
<br>
Clone the repository using `git clone https://github.com/thespark-dev/twitch-chat-logger.git`
<br>
This runs on Node.js (obviously). Please download at https://nodejs.org/en/download/ 
<br>
Then install the packages by opening a cmd and typing `npm i`
<br>
You then need to configure the `app.js` and `config.json`. Change the `var joinchnl = ''` in `app.js` to your channelname.
and the `"token": "oauth:something4w89f4we89f4"` to your token from https://twitchapps.com/tmi
<br>
After the install and configuration run by typing `node app.js`
