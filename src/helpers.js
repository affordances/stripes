import { maxMagnitude, maxStripeCount, lettersToNumbers } from "./config.js";

function* everyNum(first, last) {
  let i = first;
  while (i <= last) {
    yield i;
    i++;
  }
}

function* everyOtherNum(first, last) {
  let i = first;
  while (i <= last) {
    yield i;
    i += 2;
  }
}

export const createMagnitudeOptions = (start) => {
  const minMagnitude = Number(start);
  const nums =
    minMagnitude % 2 === 0
      ? [...everyOtherNum(minMagnitude, maxMagnitude)]
      : [...everyNum(minMagnitude, maxMagnitude)];
  return nums.map((num) => ({ value: num, label: num }));
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
      middles.forEach((middle) => results.push([i].concat(middle, [i])));
    }
  }
  return results;
};

export const convertToRows = (array) => {
  return array.reduce((a, _, i) => {
    return i % 3 === 0 ? a.concat([array.slice(i, i + 3)]) : a;
  }, []);
};

export const convertToColumns = (array) => {
  return [0, 1, 2].map((x) => array.filter((_, i) => i % 3 === x));
};

export const getRowHeight = (pattern) => {
  const patternHeight = pattern.length ? pattern[0][0].magnitude : 0;
  return patternHeight > 0 ? patternHeight * 10 + 47 : 0;
};

export const getRandomElFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getRandomColorCount = (randomStripeCount) => {
  return randomStripeCount % 2 === 0
    ? 2
    : Math.floor(Math.random() * Math.min(randomStripeCount, 3)) + 1;
};

export const getRandomStripeCount = () => {
  return Math.floor(Math.random() * maxStripeCount) + 1;
};

export const getRandomMagnitude = (options) => {
  return Number(options[Math.floor(Math.random() * options.length)].value);
};

export const getColor = (color, pickedColors) => {
  return color === 0
    ? { label: "white", value: "#f6f7f4" }
    : pickedColors[(color - 1).toString()];
};

export const getRandomPattern = (patterns) => {
  return [[patterns[Math.floor(Math.random() * patterns.length)]]];
};

// used to create colorSequences
export const splitter = (arr) => {
  return arr.map((arr2) =>
    arr2.split("").map((letter) => lettersToNumbers[letter])
  );
};
