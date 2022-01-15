// const words = "Hello Elzero Web School    A "
//   .split(" ")
//   .filter((word) => word.length > 2);

// console.log(words[words.length]);

function wordBeforeLastLength(sentence) {
  const words = sentence.split(" ").filter((word) => word.length > 2);
  if (words.length === 2) return words[0];
  else if (words.length === 1) return false;
  else return words[words.length - 2].length;
}

console.log(wordBeforeLastLength("Elzero Web School")); // Web => 3
console.log(wordBeforeLastLength("Hello Elzero Web School    A ")); // Web => 3
console.log(wordBeforeLastLength("Hello Elzero    Web   School  ")); // Web => 3
console.log(wordBeforeLastLength("Hello")); // False
console.log(wordBeforeLastLength("Hello Elzero")); // Hello
console.log(wordBeforeLastLength("Hello Elzero    A")); // Hello
