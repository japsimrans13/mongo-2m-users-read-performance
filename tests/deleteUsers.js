const axios = require('axios');

const baseURL = 'http://localhost:3000';

async function deleteAllUsers() {
  try {
    const response = await axios.delete(`${baseURL}/users`);
    console.log('Delete All Users Response:', response.data);
  } catch (error) {
    console.error('Error deleting all users:', error.response.data);
  }
}



deleteAllUsers();
