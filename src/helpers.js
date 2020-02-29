import maxMagnitude, { lettersToNumbers } from "./config.js";

export const createMagnitudeOptions = start => {
  let options = [];
  start = Number(start);

  if (start % 2 === 0) {
    for (let i = start; i <= maxMagnitude; i += 2) {
      options.push({ value: i, label: i });
    }
  } else {
    for (let i = start; i <= maxMagnitude; i++) {
      options.push({ value: i, label: i });
    }
  }
  return options;
};

export const createNumberPalindromes = (stripes, magnitude) => {
  let results = [];

  if (stripes === 1 && magnitude > 0) {
    results.push([magnitude]);
  } else if (stripes === 2 && magnitude % 2 === 0 && magnitude > 0) {
    results.push([magnitude / 2, magnitude / 2]);
  } else if (2 < stripes && stripes <= magnitude) {
    for (let i = 1; i <= magnitude / 2; i++) {
      const middles = createNumberPalindromes(stripes - 2, magnitude - 2 * i);
      middles.forEach(middle => results.push([i].concat(middle, [i])));
    }
  }
  return results;
};

export const convertTo2D = array => {
  let result = [];
  let i = 0;

  while (i < array.length) {
    result.push(array.slice(i, i + 4));
    i += 4;
  }
  return result;
};

// export const splitter = arr => {
//   return arr.map(arr2 =>
//     arr2.split("").map(letter => lettersToNumbers[letter])
//   );
// };

// splitter([]);
