const createErrorAttachment = (error) => ({
  color: 'danger',
  text: `*Error*\n${error.message}`,
  mrkdwn_in: ['text']
})

module.exports = { createErrorAttachment }
