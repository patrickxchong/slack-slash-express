const Express = require('express')
const bodyParser = require('body-parser')

const { createErrorAttachment } = require("./slackMessageTemplates")

const slashCommandFactory = {
  "/reqbin": require("./commands/reqbin"),
  "/echo": require("./commands/echo"),
  "/mentalogue": require("./commands/mentalogue")
}

const app = new Express()

// Slack sends data in the form of application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  let commandHandler = slashCommandFactory["/mentalogue"];
  let payload = await commandHandler();
  // console.log(payload);
  // res.json(payload);
  // res.status(200).end()
  res.json({ text: "Hello world!" });
})

app.post('/', async (req, res) => {
  try {
    if (JSON.stringify(req.body) === '{}') {
      throw new Error('No body in request.')
    }

    let command = req.body.command;
    let commandHandler = slashCommandFactory[command]

    if (commandHandler === undefined) {
      throw new Error("Invalid slash command sent.");
    }

    let result = await commandHandler(req.body);

    // Set default response_type to 'in_channel' for it to be visible to everyone
    let response = Object.assign({ response_type: "in_channel" }, result)

    console.log(response);
    res.json(response);

  } catch (error) {
    console.error(error);
    res.json({
      attachments: [createErrorAttachment(error)]
    });

  }
})

module.exports = app;