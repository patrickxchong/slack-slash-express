const Express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const slashCommandFactory = require('./slashCommandFactory')

const app = new Express()
app.use(bodyParser.urlencoded({ extended: true }))

async function reqbinHandler(body) {
  return { text: JSON.stringify(body) }
}
async function echoHandler(body) {
  return { text: `<@${body.user_id}> said ${body.text} in <#${body.channel_id}>` };
}
async function practitionerHandler(body) {
  let res = await axios.get("https://api.mentalogue.my/api/v1/practitioners");
  return { text: JSON.stringify(res.data.results) };
}

app.get('/', async (req, res) => {
  let payload = await practitionerHandler();
  // console.log(payload);
  // res.json(payload);
  // res.status(200).end()
  res.json({ text: "Hello world!" });
})

app.post('/', async (req, res) => {
  try {
    let command = req.body.command;
    let commandHandler;
    if (command === "/reqbin") {
      commandHandler = slashCommandFactory(reqbinHandler)
    } else if (command === "/echo") {
      commandHandler = slashCommandFactory(echoHandler)
    } else if (command === "/mentalogue") {
      commandHandler = slashCommandFactory(practitionerHandler)
    } else {
      throw new Error("Invalid slash command sent.");
    }
    let result = await commandHandler(req.body);

    console.log(result);
    res.json(result);

  } catch (error) {
    console.error(error);
    let commandHandler = slashCommandFactory(() => { throw error });
    let result = await commandHandler({});
    res.json(result);

  }
})

module.exports = app;