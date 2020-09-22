const axios = require('axios');

const apiTest = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);
  // console.log(response.data);
  const { data } = response
  return data;
}

module.exports = apiTest;