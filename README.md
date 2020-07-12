# slack-slash-express

This repo implements a simple multipurpose [Slack](https://slack.com/) slash command server written in Express.js.

Implemented slash commands so far (mostly for demo purposes):
- `/reqbin`: Request bin to see body of request sent by the slash command. (Use https://requestbin.com for a better UI)
- `/echo`: Echoes message sent by user with `/echo [message]`
- `/mentalogue`: The initial goal for this project is to build an internal dashboard for Mentalogue. This repo is a proof of concept that this works (implementation in progress)

## Credits

Code was initially adapted from https://github.com/lmammino/slack-shorturl-integration, and extensively modified after that. 


## License

Licensed under [MIT License](LICENSE). © Patrick Chong.
