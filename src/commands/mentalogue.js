const axios = require('axios')

async function practitionerHandler(body) {
  let res = await axios.get("https://api.mentalogue.my/api/v1/practitioners");
  return { text: JSON.stringify(res.data.results) };
}

module.exports = practitionerHandler;