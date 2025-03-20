const nspell = require('nspell');
const XLSX = require('xlsx');

(async () => {
  try {
    // Fetch data from the API
    const apiUrl =
    "https://qa-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant9-singapore/wp-json/wp/v2/en/categories?category_names=global,errormsg,validations";
      const response = await fetch(apiUrl);
    const data = await response.json(); // Parse JSON response

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Dynamically import the dictionary
    const { default: dictionary } = await import('dictionary-en');

    // Load the dictionary
    const spell = nspell(dictionary);

    // Process each category and add it as a sheet
    Object.keys(data).forEach((category) => {
      const categoryData = data[category];

      // Convert category data to an array of objects and sort by keys in ascending order
      const rows = Object.entries(categoryData)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // Ascending order
        .map(([key, value]) => {
          const isMisspelled = !spell.correct(value);
          const correction = isMisspelled ? spell.suggest(value)[0] : '';
          console.log(correction)
          return {
            Key: key,
            Value: value,
            Correction: correction,
          };
        });

      // Create a worksheet from the rows
      const worksheet = XLSX.utils.json_to_sheet(rows);
      // Add worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, category);
    });

    // Write the workbook to a file
    const filename = "Web_English_Check.xlsx";
    XLSX.writeFile(workbook, filename);
    console.log(`Excel file saved as ${filename}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();