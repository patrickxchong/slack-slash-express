const axios = require('axios')

async function practitionerHandler(body) {
  let res = await axios.get("https://api.mentalogue.my/api/v1/practitioners");
  let message = {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Hello, here are the results."
        }
      },
      {
        "type": "divider"
      },
    ]
  }
  res.data.results.map(value => {
    let section = {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*${value.full_name}* <https://app.mentalogue.my/profile/p/${value.practitioner_id}>\n${value.description}\n`
      },
    }
    if (value.profile_pic) {
      Object.assign(section, {
        "accessory": {
          "type": "image",
          "image_url": value.profile_pic,
          "alt_text": `${value.full_name}'s Profile Picture`
        }
      })
    }
    message.blocks.push(section)
  })
  message.blocks.push({
    "type": "divider"
  },
  )
  message.blocks.push({
    "type": "actions",
    "elements": [
      {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Action 1",
          "emoji": true
        },
        "value": "action_1"
      },
      {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Action 2",
          "emoji": true
        },
        "value": "action_2"
      },
      {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Action 3",
          "emoji": true
        },
        "value": "action_3"
      }
    ]
  })
  return message;
}

module.exports = practitionerHandler;