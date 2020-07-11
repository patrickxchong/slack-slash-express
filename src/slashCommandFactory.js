const createErrorAttachment = (error) => ({
  color: 'danger',
  text: `*Error*:\n${error.message}`,
  mrkdwn_in: ['text']
})

const createSuccessAttachment = (link) => ({
  color: 'good',
  text: `*<http://${link.shortUrl}|${link.shortUrl}>* (<https://www.rebrandly.com/links/${link.id}|edit>):\n${link.destination}`,
  mrkdwn_in: ['text']
})

const createAttachment = (result) => {
  if (result.constructor === Error) {
    return createErrorAttachment(result)
  }

  return createSuccessAttachment(result)
}

const slashCommandFactory = (slashCommandHandler) => async (body) => {
  try {
    if (!body) {
      throw new Error('Invalid body')
    }

    let result = await slashCommandHandler(body);
    let response = Object.assign({}, result, { response_type: "in_channel" })
    return response;

  } catch (error) {
    return ({
      text: '',
      attachments: [createErrorAttachment(error)]
    })
  }
}

module.exports = slashCommandFactory
