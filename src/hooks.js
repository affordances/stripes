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

export const useStripes = (isDesktopOrTablet) => {
  const [mobileView, setMobileView] = useState("home");
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

    const formatted = isDesktopOrTablet ? convertToRows(results) : results;

    if (randomMode.current) {
      setPatternCount(1);
      setPatterns(getRandomPattern(results, isDesktopOrTablet));
    } else {
      setPatternCount(results.length);
      setPatterns(formatted);
    }

    setMobileView("patterns");
  };

  const updatePickedColors = (newColor) => {
    const maxColors = Math.min(stripeCountValue, 3);
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
    setMobileView("home");
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
    mobileView,
    setMobileView,
  };
};

export const useLocalStorage = () => {
  const [savedPatterns, setSavedPatterns] = useState([]);
  const key = "Saved Patterns";

  const toggleSavedPattern = (pattern) => {
    const savedPatternsCopy = [...savedPatterns];
    const stringifiedPattern = JSON.stringify(pattern);
    const stringifiedSavedPatterns = savedPatternsCopy.map(JSON.stringify);
    const patternIdx = stringifiedSavedPatterns.indexOf(stringifiedPattern);

    const newSavedPatterns =
      patternIdx === -1
        ? savedPatternsCopy.concat(pattern)
        : savedPatternsCopy.filter((_, i) => i !== patternIdx);

    localStorage.setItem(key, JSON.stringify(newSavedPatterns));
    setSavedPatterns(newSavedPatterns);
  };

  const isPatternSaved = (pattern) => {
    return (
      savedPatterns.find(
        (savedPattern) =>
          JSON.stringify(savedPattern) === JSON.stringify(pattern)
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
