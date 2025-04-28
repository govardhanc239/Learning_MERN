// Function to fetch and parse JSON data
async function fetchJson(url) {
    const response = await fetch(url);
    return response.json();
}

// Function to extract all keys recursively from a nested object
function extractKeys(jsonData, parentKey = '') {
    let keys = new Set();

    if (typeof jsonData === 'object' && jsonData !== null) {
        for (const key in jsonData) {
            const fullKey = parentKey ? `${parentKey}.${key}` : key; // Build the full key path
            keys.add(fullKey);

            // If the value is an object, recurse to extract nested keys
            if (typeof jsonData[key] === 'object' && jsonData[key] !== null) {
                const nestedKeys = extractKeys(jsonData[key], fullKey);
                nestedKeys.forEach(nestedKey => keys.add(nestedKey));
            }
        }
    }

    return keys;
}

// Function to get the value of a key from a nested object
function getValueByKey(obj, key) {
    const keys = key.split('.'); // Split the key by '.' for nested keys
    let value = obj;

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return undefined; // Return undefined if the key doesn't exist
        }
    }

    return value;
}

// Function to compare keys and values between two sets
function compareKeysAndValues(keys1, keys2, data1, data2) {
    const missingInFirst = [...keys2].filter(key => !keys1.has(key)).map(key => ({
        key,
        value: getValueByKey(data2, key)
    }));
    const missingInSecond = [...keys1].filter(key => !keys2.has(key)).map(key => ({
        key,
        value: getValueByKey(data1, key)
    }));
    return { missingInFirst, missingInSecond };
}

// URLs of the APIs
const url1 = 'https://dev-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant12-thailand/wp-json/wp/v2/en/categories?category_names=imagesandicons';
const url2 = 'https://qa-cms-dashboard.patientcaresolution.com/RocheMultiSite/tenant12-thailand/wp-json/wp/v2/en/categories?category_names=imagesandicons';

(async () => { 
    try {
        const [data1, data2] = await Promise.all([fetchJson(url1), fetchJson(url2)]);

        const keys1 = extractKeys(data1);
        const keys2 = extractKeys(data2);

        const { missingInFirst, missingInSecond } = compareKeysAndValues(keys1, keys2, data1, data2);

        console.log('Keys and values missing in first API:', missingInFirst);
        console.log('Keys and values missing in second API:', missingInSecond);
    } catch (error) {
        console.error("Error:", error);
    }
})();