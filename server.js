const axios = require('axios');
const xlsx = require('xlsx');
const fs = require('fs');

const url = 'https://dev-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant7/wp-json/wp/v2/en/categories?category_names=rpaplead';

async function fetchDataAndConvertToExcel() {
  try {
    // Fetch data from the API
    const response = await axios.get(url);
    const data = response.data.rpaplead;
    console.log(data)
    // Prepare data for Excel (Key, Value)
    const sheetData = [["key", "value"]]; // Headers for Excel

    // Handle the case where data is an object
    Object.keys(data).forEach((key) => {
      sheetData.push([key, data[key]]);
    });

    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.aoa_to_sheet(sheetData);

    // Append the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, "Categories");

    // Write the workbook to a file
    xlsx.writeFile(workbook, 'categories.xlsx');

    console.log('Excel file created successfully: categories.xlsx');
  } catch (error) {
    console.error('Error fetching or processing data:', error.message);
  }
}

fetchDataAndConvertToExcel();
