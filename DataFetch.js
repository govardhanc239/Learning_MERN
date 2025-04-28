

//dta fetch to excel of all categories
const XLSX = require("xlsx");
const fs = require('fs');

// Function to fetch data from the API and save it to an Excel file
async function fetchAndSaveToExcel(apiUrl) {
  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json(); // Parse JSON response

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Process each category and add it as a sheet
    Object.keys(data).forEach((category) => {
      const categoryData = data[category];
      // Convert category data to an array of objects and sort by keys in ascending order
      const rows = Object.entries(categoryData)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Ascending order
        .map(([key, value]) => ({
          Key: key,
          Value: value,
        }));
      // Create a worksheet from the rows
      const worksheet = XLSX.utils.json_to_sheet(rows);

      // Add worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, category);
    });

    // Write the workbook to a file
    const filename = "MY-prelogin-data.xlsx";
    XLSX.writeFile(workbook, filename);
    console.log(`Excel file saved as ${filename}`);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}
// API URL
const apiUrl =
  "https://dev-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant7/wp-json/wp/v2/en/prelogincategories?category_names=errormsg,login";

// Call the function with sorting in ascending order
fetchAndSaveToExcel(apiUrl);


