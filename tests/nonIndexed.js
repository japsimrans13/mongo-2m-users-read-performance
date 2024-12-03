const axios = require('axios');
const xlsx = require('xlsx');
const fs = require('fs');
const baseURL = 'http://localhost:3000';

async function getUserByNonIndexedEmail(email) {
  try {
    const response = await axios.get(`${baseURL}/user/non-indexed`, {
      params: { email },
    });

    console.log('Get User by Non-Indexed Email Response:', response.data);

    // Extract the user data from the response
    const user = response.data.user;

    // Convert the user data to a format suitable for XLSX (array of arrays)
    const data = [
      [user.name, response.data.readTime, response.data.total],
    ];

    // Check if the file already exists
    const filename = 'results/non-indexed.xlsx';
    let wb;

    if (fs.existsSync(filename)) {
      // If the file exists, read it
      wb = xlsx.readFile(filename);

      // Append the new data to the existing sheet
      const ws = wb.Sheets[wb.SheetNames[0]]; // 
      const existingData = xlsx.utils.sheet_to_json(ws, { header: 1 });

      // Add the new row of data
      existingData.push(['User', 'Response Time', 'Total Users']); // Adding header once if needed
      existingData.push(...data); // Append new data

      // Convert back to a worksheet
      const updatedWs = xlsx.utils.aoa_to_sheet(existingData);
      wb.Sheets[wb.SheetNames[0]] = updatedWs;
    } else {
      // If the file does not exist, create a new one
      const dataWithHeader = [
        ['Name', 'Response Time', 'Total Users'],
        ...data
      ];
      wb = xlsx.utils.book_new();
      const ws = xlsx.utils.aoa_to_sheet(dataWithHeader);
      xlsx.utils.book_append_sheet(wb, ws, 'Non Indexed');
    }

    // Save the workbook to a file
    xlsx.writeFile(wb, filename);
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    console.error('Error getting user by non-indexed email:', error.response ? error.response.data : error.message);
  }
}

const [,, email] = process.argv;
if (!email) {
  console.error('Please provide an email address');
  process.exit(1);
}

// run the test 10 times
const runTest = async () => {
  for (let i = 0; i < 10; i++) {
    await getUserByNonIndexedEmail(email);
  }
}

runTest();