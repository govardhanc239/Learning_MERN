// Function to fetch and parse JSON data
async function fetchJson(url) {
    const response = await fetch(url);
    return response.json();
}

// Function to extract all keys recursively from a nested object
function extractKeys(jsonData) {
    let keys = new Set();

    if (typeof jsonData === 'object' && jsonData !== null) {
        for (const key in jsonData) {
            const fullKey =  key;
            keys.add(fullKey);

            // If the value is an object, recurse to extract nested keys
            if (typeof jsonData[key] === 'object' && jsonData[key] !== null) {
                const nestedKeys = extractKeys(jsonData[key]);
                nestedKeys.forEach(nestedKey => keys.add(nestedKey));
            }
        }
    }

    return keys;
}

// Function to compare keys between two sets
function compareKeysAndValues(keys1, keys2, data1, data2) {
    const missingInFirst = [...keys2].filter(key => !keys1.has(key)).map(key => ({ key, value: data2[key] }));
    const missingInSecond = [...keys1].filter(key => !keys2.has(key)).map(key => ({ key, value: data1[key] }));
    return { missingInFirst, missingInSecond };
}
// URLs of the APIs
const url1 = 'https://dev-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant12-thailand/wp-json/wp/v2/en/categories?category_names=rsa';
const url2 = 'https://qa-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant12-thailand/wp-json/wp/v2/en/categories?category_names=rsa';

(async () => {
    try {
        const [data1, data2] = await Promise.all([fetchJson(url1), fetchJson(url2)]);

        // console.log("Data1:", data1);
        // console.log("Data2:", data2);

        const keys1 = extractKeys(data1);
        const keys2 = extractKeys(data2);

        const { missingInFirst, missingInSecond } = compareKeysAndValues(keys1, keys2, data1, data2);

        console.log('Keys missing in first API:', missingInFirst);
        console.log('Keys missing in second API:', missingInSecond);
    } catch (error) {
        console.error("Error:", error);
    }
})();
