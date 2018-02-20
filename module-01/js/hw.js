const str1 = 'qwertyuiop[]\\';
const str2 = 'asdfghjkl;';
const str3 = 'zxcvbnm,./';

const lengthStr1 = str1.length;
const lengthStr2 = str2.length;
const lengthStr3 = str3.length;

let firstChar1 = str1.charAt(0);
let firstChar2 = str2.charAt(0);
let firstChar3 = str3.charAt(0);

let lestChar1 = str1.charAt(lengthStr1 - 1);
let lestChar2 = str2.charAt(lengthStr2 - 1);
let lestChar3 = str3.charAt(lengthStr3 - 1);

let indexOfOpenSquareBracket1 = str1.indexOf('[');
let indexOfOpenSquareBracket2 = str2.indexOf('[');
let indexOfOpenSquareBracket3 = str3.indexOf('[');

let indexOfClosedSquareBracket1 = str1.indexOf(']');
let indexOfClosedSquareBracket2 = str2.indexOf(']'); 
let indexOfClosedSquareBracket3 = str3.indexOf(']');

console.log
(`
str1 = ${str1}  |  lengthStr1 = ${lengthStr1}  |  firstChar1 = ${firstChar1}  |  indexOfOpenSquareBracket1 = ${indexOfOpenSquareBracket1}  |  indexOfClosedSquareBracket1 = ${indexOfClosedSquareBracket1}
str2 = ${str2}  |  lengthStr2 = ${lengthStr2}  |  firstChar2 = ${firstChar2}  |  indexOfOpenSquareBracket2 = ${indexOfOpenSquareBracket2}  |  indexOfClosedSquareBracket2 = ${indexOfClosedSquareBracket2}
str3 = ${str3}  |  lengthStr3 = ${lengthStr3}  |  firstChar3 = ${firstChar3}  |  indexOfOpenSquareBracket3 = ${indexOfOpenSquareBracket3}  |  indexOfClosedSquareBracket3 = ${indexOfClosedSquareBracket3}
`);








