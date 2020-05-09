import { useState, useEffect, useRef } from "react";

import { colors, colorSequences, numbersToLetters } from "./config.js";

import {
  createMagnitudeOptions,
  createNumberPalindromes,
  convertTo2D,
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

  const createPatterns = () => {
    const numberPalindromes = createNumberPalindromes(
      stripeCountValue,
      magnitude
    );
    const sequences = colorSequences[stripeCountValue][pickedColors.length];
    const results = [];

    for (let i = 0; i < numberPalindromes.length; i++) {
      for (let j = 0; j < sequences.length; j++) {
        let pattern = sequences[j].map((color) => {
          if (color === 0) {
            return { color: { label: "white", value: "#f6f7f4" } };
          } else {
            return { color: pickedColors[(color - 1).toString()] };
          }
        });
        for (let k = 0; k < numberPalindromes[i].length; k++) {
          pattern[k]["count"] = numberPalindromes[i][k];
        }
        results.push({
          label: `${stripeCountValue}m${magnitude}, ${numberPalindromes[i].join(
            "/"
          )}, ${sequences[j].map((num) => numbersToLetters[num]).join("")}`,
          pattern,
        });
      }
    }

    const converted = convertTo2D(results);

    if (randomMode.current) {
      setPatternCount(1);
      setPatterns([[results[Math.floor(Math.random() * results.length)]]]);
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
