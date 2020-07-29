import { useState, useEffect, useRef } from "react";

import { colors, colorSequences, numbersToLetters } from "./config.js";
import {
  createMagnitudeOptions,
  createNumberPalindromes,
  convertToRows,
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

  const getColor = (color) => {
    return color === 0
      ? { label: "white", value: "#f6f7f4" }
      : pickedColors[(color - 1).toString()];
  };

  const getLabel = (seq, pal) => {
    return `${stripeCountValue}m${magnitude}, ${pal.join("/")}, ${seq
      .map((num) => numbersToLetters[num])
      .join("")}`;
  };

  const getPattern = (seq, pal) => {
    return seq.map((color, i) => ({
      color: getColor(color),
      count: pal[i],
    }));
  };

  const getRandomPattern = (patterns) => {
    return [[patterns[Math.floor(Math.random() * patterns.length)]]];
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
    let newPickedColors = pickedColors.map((color) => ({ ...color }));

    if (pickedColors.find((color) => color.value === newColor.value)) {
      newPickedColors = pickedColors.filter(
        (color) => color.value !== newColor.value
      );
    } else {
      if (
        pickedColors.length === stripeCountValue ||
        pickedColors.length === 3
      ) {
        newPickedColors.pop();
      }
      newPickedColors.push(newColor);
    }

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
    const randomStripeCount = Math.floor(Math.random() * 9) + 1;
    const options = createMagnitudeOptions(randomStripeCount);
    const colorCount =
      randomStripeCount % 2 === 0
        ? 2
        : Math.floor(Math.random() * Math.min(randomStripeCount, 3)) + 1;
    let results = [];
    let i = 0;
    while (i < colorCount) {
      const colorIdx = Math.floor(Math.random() * colors.length);
      if (!results.includes(colors[colorIdx])) {
        results.push(colors[colorIdx]);
        i++;
      }
    }
    setStripeCount({ value: randomStripeCount, label: randomStripeCount });
    setMagnitudeOptions(options);
    setMagnitude(
      Number(options[Math.floor(Math.random() * options.length)].value)
    );
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
