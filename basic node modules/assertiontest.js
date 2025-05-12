const axios = require('axios');
const assert = require('node:assert').strict;

async function testAPI() {
  try {
    // Make a GET request to the API
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');

    // Assertions to verify the API response
    assert.strictEqual(response.status, 200, 'API did not return a 200 status code'); // Check HTTP status code
    assert(Array.isArray(response.data), 'Response data is not an array'); // Check if response data is an array

    // Additional checks on the data
    const users = response.data;
    assert(users.length > 0, 'No users returned from API'); // Check that users array is not empty

    // Check structure of the first user object
    const firstUser = users[0];
    assert('dept' in firstUser, 'User object does not have an "dept" property');
    assert('name' in firstUser, 'User object does not have a "name" property');
    assert('email' in firstUser, 'User object does not have an "email" property');

    console.log('All tests passed! The API is working properly.');
  } catch (err) {
    if (err instanceof assert.AssertionError) {
      console.error(`Assertion failed: ${err.message}`);
    } else {
      console.error(`An error occurred: ${err.message}`);
    }
  }
}

testAPI();
