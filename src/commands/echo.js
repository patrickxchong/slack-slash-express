async function echoHandler(body) {
  return { text: `<@${body.user_id}> said ${body.text} in <#${body.channel_id}>` };
}

module.exports = echoHandler;