async function reqbinHandler(body) {
  return { text: JSON.stringify(body) }
}

module.exports = reqbinHandler;