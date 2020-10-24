import { maxMagnitude, maxStripeCount, lettersToNumbers } from "./config.js";

import { customWhite } from "./components/desktopAndTablet/desktopAndTabletStyles.js";

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

export const createNumberPalindromes = (arrLength, arrSum) => {
  let results = [];

  if (arrLength === 1 && arrSum > 0) {
    results.push([arrSum]);
  } else if (arrLength === 2 && arrSum % 2 === 0 && arrSum > 0) {
    results.push([arrSum / 2, arrSum / 2]);
  } else if (2 < arrLength && arrLength <= arrSum) {
    for (let i = 1; i <= arrSum / 2; i++) {
      const middles = createNumberPalindromes(arrLength - 2, arrSum - 2 * i);
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

export const getRowHeight = (patterns, isDesktopOrTablet) => {
  const patternHeight = patterns.length
    ? isDesktopOrTablet
      ? patterns[0][0].magnitude
      : patterns[0].magnitude
    : 0;
  return patternHeight > 0 ? patternHeight * 8 + 36 : 0;
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
    ? { label: "white", value: customWhite }
    : pickedColors[(color - 1).toString()];
};

export const getRandomPattern = (patterns, isDesktopOrTablet) => {
  const random = patterns[Math.floor(Math.random() * patterns.length)];
  return isDesktopOrTablet ? [[random]] : [random];
};

// used to create colorSequences
export const splitter = (arr) => {
  return arr.map((arr2) =>
    arr2.split("").map((letter) => lettersToNumbers[letter])
  );
};
