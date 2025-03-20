const findUniqueChars = (str) => {
    const charMap = new Map();
    [...str].forEach(char => charMap.set(char, (charMap.get(char) || 0) + 1));
    return [...charMap.keys()].join('');
};
console.log(findUniqueChars('hello')); // helo