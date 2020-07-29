import { useState, useEffect, useRef } from "react";

import { colors, colorSequences, numbersToLetters } from "./config.js";
import {
  createMagnitudeOptions,
  createNumberPalindromes,
  convertToRows,
  getRandomColorCount,
  getRandomElFromArray,
  getRandomStripeCount,
  getRandomMagnitude,
  getColor,
  getRandomPattern,
} from "./helpers.js";

export const useStripes = () => {
  const [stripeCount, setStripeCount] = useState(null);
  const [magnitude, setMagnitude] = useState(null);
  const [magnitudeOptions, setMagnitudeOptions] = useState(null);
  const [pickedColors, setPickedColors] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [patternCount, setPatternCount] = useState(0);

  const randomMode = useRef(false);

  useEffect(() => {
    if (randomMode.current) {
      createPatterns();
      randomMode.current = false;
    }
  });

  const stripeCountValue = stripeCount ? Number(stripeCount.value) : null;
  const isColorCountValid =
    stripeCountValue % 2 === 0
      ? pickedColors.length > 1 && stripeCountValue >= pickedColors.length
      : pickedColors.length > 0 && stripeCountValue >= pickedColors.length;
  const anyChoicesMade = stripeCountValue || magnitude || isColorCountValid;
  const allChoicesMade = stripeCountValue && magnitude && isColorCountValid;

  const getLabel = (seq, pal) => {
    return `${stripeCountValue}m${magnitude}, ${pal.join("/")}, ${seq
      .map((num) => numbersToLetters[num])
      .join("")}`;
  };

  const getPattern = (seq, pal) => {
    return seq.map((color, i) => ({
      color: getColor(color, pickedColors),
      count: pal[i],
    }));
  };

  const createPatterns = () => {
    const numberPalindromes = createNumberPalindromes(
      stripeCountValue,
      magnitude
    );
    const selectedColorSequences =
      colorSequences[stripeCountValue][pickedColors.length];
    const results = numberPalindromes.flatMap((pal) =>
      selectedColorSequences.map((seq) => {
        return {
          label: getLabel(seq, pal),
          pattern: getPattern(seq, pal),
          magnitude,
        };
      })
    );

    const converted = convertToRows(results);

    if (randomMode.current) {
      setPatternCount(1);
      setPatterns(getRandomPattern(results));
    } else {
      setPatternCount(results.length);
      setPatterns(converted);
    }
  };

  const updatePickedColors = (newColor) => {
    const maxColors = Math.max(stripeCountValue, 3);
    const newPickedColors = pickedColors.find(
      (color) => color.value === newColor.value
    )
      ? pickedColors.filter((color) => color.value !== newColor.value)
      : pickedColors.slice(0, maxColors - 1).concat(newColor);

    setPickedColors(newPickedColors);
  };

  const reset = () => {
    setStripeCount(null);
    setMagnitude(null);
    setMagnitudeOptions(null);
    setPickedColors([]);
    setPatterns([]);
    setPatternCount(0);
  };

  const random = () => {
    const randomStripeCount = getRandomStripeCount();
    const options = createMagnitudeOptions(randomStripeCount);
    const colorCount = getRandomColorCount(randomStripeCount);

    const results = Array(colorCount)
      .fill(0)
      .reduce((colAcc) => {
        const freeColors = colors.filter((color) => !colAcc.includes(color));
        const newColor = getRandomElFromArray(freeColors);
        return colAcc.concat(newColor);
      }, []);

    setStripeCount({ value: randomStripeCount, label: randomStripeCount });
    setMagnitudeOptions(options);
    setMagnitude(getRandomMagnitude(options));
    setPickedColors(results);
    randomMode.current = true;
  };

  return {
    magnitude,
    setMagnitude,
    setMagnitudeOptions,
    setStripeCount,
    setPickedColors,
    stripeCount,
    magnitudeOptions,
    patterns,
    patternCount,
    anyChoicesMade,
    allChoicesMade,
    updatePickedColors,
    reset,
    random,
    stripeCountValue,
    pickedColors,
    createPatterns,
  };
};

export const useLocalStorage = () => {
  const [savedPatterns, setSavedPatterns] = useState([]);
  const key = "Saved Patterns";

  const toggleSavedPattern = (pattern) => {
    const savedPatternStrings = savedPatterns.map(JSON.stringify);
    const idx = savedPatternStrings.indexOf(JSON.stringify(pattern));
    const result = [...savedPatterns];

    if (idx === -1) {
      result.push(pattern);
    } else {
      result.splice(idx, 1);
    }

    localStorage.setItem(key, JSON.stringify(result));

    setSavedPatterns(result);
  };

  const isPatternSaved = (pattern) => {
    return (
      savedPatterns.find(
        (x) => JSON.stringify(x) === JSON.stringify(pattern)
      ) !== undefined
    );
  };

  const clearSavedPatterns = () => {
    localStorage.clear();
    setSavedPatterns([]);
  };

  useEffect(() => {
    const retrievedStorage = JSON.parse(localStorage.getItem(key));
    setSavedPatterns(retrievedStorage === null ? [] : retrievedStorage);
  }, []);

  return {
    savedPatterns,
    toggleSavedPattern,
    clearSavedPatterns,
    isPatternSaved,
  };
};
