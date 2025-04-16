"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.generateId = exports.getOffset = void 0;
const getOffset = (pageNo, limit) => {
    if (pageNo === 0) {
        pageNo = 1;
    }
    let offsetVal = (pageNo - 1) * limit;
    return offsetVal;
};
exports.getOffset = getOffset;
const generateId = (count) => {
    var digits = '0123456789';
    let num = '';
    for (let i = 0; i < count; i++) {
        num += digits[Math.floor(Math.random() * 10)];
    }
    return parseInt(num);
};
exports.generateId = generateId;
const generatePassword = () => {
    const length = 8;
    const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberCharset = "0123456789";
    const specialCharset = "@#$%^&*()_<>";
    // Initialize the password with a lowercase character
    let password = lowercaseCharset.charAt(Math.floor(Math.random() * lowercaseCharset.length));
    // Add an uppercase character
    password += uppercaseCharset.charAt(Math.floor(Math.random() * uppercaseCharset.length));
    // Add a number
    password += numberCharset.charAt(Math.floor(Math.random() * numberCharset.length));
    // Add a special character
    password += specialCharset.charAt(Math.floor(Math.random() * specialCharset.length));
    // Add remaining characters
    const remainingLength = length - password.length;
    const allCharsets = lowercaseCharset + uppercaseCharset + numberCharset + specialCharset;
    for (let i = 0; i < remainingLength; i++) {
        password += allCharsets.charAt(Math.floor(Math.random() * allCharsets.length));
    }
    // Shuffle the password to ensure characters are randomized
    password = shuffleString(password);
    return password;
};
exports.generatePassword = generatePassword;
const shuffleString = (str) => {
    const charArray = str.split('');
    for (let i = charArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }
    return charArray.join('');
};
