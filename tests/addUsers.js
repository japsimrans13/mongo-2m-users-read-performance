// Script to add bulk user to the database
const axios = require('axios');
const baseURL = 'http://localhost:3000';

async function addUser(count, batch = 20) {
  try {
    for (let i = 0; i < batch; i ++) {
    const response = await axios.post(`${baseURL}/users`, {
        count,
    });
    console.log('Add User Response:', response.data);
  }
  } catch (error) {
    console.error('Error adding user:', error.response?.data);
  }
}

const [,, count] = process.argv;
if (!count) {
  console.error('Please provide the number of users to add as an argument.');
  process.exit(1);
}

console.log('Count:', count);
addUser(count);
