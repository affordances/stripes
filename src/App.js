import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import {
  colors,
  maxMagnitude,
  stripeOptions,
  colorSequences,
  numbersToLetters,
  lettersToNumbers
} from "./config.js";
import "./index.css";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;

const SelectContainer = styled.div`
  width: 150px;
  margin-right: 20px;
`;

const SelectHeader = styled.h5``;

const Swatch = styled.div`
  background: ${props => props.color};
  width: 20px;
  height: 20px;
`;

const SwatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 100px;
  height: 60px;
`;

const PickedColors = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const StripesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Pattern = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button``;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Stripe = styled.div`
  background: ${props => props.color};
  height: 5px;
  width: 200px;
`;

const createMagnitudeOptions = start => {
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

const createNumberPalindromes = (stripes, magnitude) => {
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

const displayPattern = pattern => {
  const patternItems = pattern.pattern.flatMap(({ count, color }) =>
    new Array(count).fill(<Stripe color={color.value} />)
  );
  return (
    <>
      {pattern.label}
      <Pattern>{patternItems}</Pattern>
    </>
  );
};

const splitter = arr => {
  return arr.map(arr2 =>
    arr2.split("").map(letter => lettersToNumbers[letter])
  );
};

// console.log(splitter());

const App = () => {
  const [stripeCount, setStripeCount] = useState(null);
  const [magnitude, setMagnitude] = useState(null);
  const [magnitudeOptions, setMagnitudeOptions] = useState(null);
  const [pickedColors, setPickedColors] = useState([]);
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    // console.log("numberPalindromes", numberPalindromes);
    // console.log("pickedColors", pickedColors);
    console.log(colorCountValidator());
  });

  const colorCountValidator = () => {
    if (stripeCount % 2 === 0) {
      return stripeCount >= pickedColors.length && pickedColors.length > 1;
    } else {
      return stripeCount >= pickedColors.length;
    }
  };

  const createPatterns = () => {
    const numberPalindromes = createNumberPalindromes(stripeCount, magnitude);
    const sequences = colorSequences[stripeCount][pickedColors.length];
    const results = [];

    for (let i = 0; i < numberPalindromes.length; i++) {
      for (let j = 0; j < sequences.length; j++) {
        let pattern = sequences[j].map(color => {
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
          label: `
          ${stripeCount}m${magnitude}, 
          ${numberPalindromes[i].join("/")}, 
          ${sequences[j].map(num => numbersToLetters[num]).join("")}
            `,
          pattern
        });
      }
    }

    setPatterns(results);
  };

  const updatePickedColors = newColor => {
    let newPickedColors = JSON.parse(JSON.stringify(pickedColors));
    if (
      pickedColors.length < stripeCount &&
      pickedColors.length < 3 &&
      pickedColors.find(color => color.value === newColor.value) === undefined
    ) {
      newPickedColors.push(newColor);
      setPickedColors(newPickedColors);
    } else if (pickedColors.find(color => color.value === newColor.value)) {
      const filteredColors = pickedColors.filter(
        color => color.value !== newColor.value
      );
      setPickedColors(filteredColors);
    }
  };

  return (
    <Container>
      <SelectContainer>
        <SelectHeader>Select stripe count</SelectHeader>
        <Select
          options={stripeOptions}
          onChange={option => {
            setStripeCount(Number(option.value));
            setMagnitude(null);
            setMagnitudeOptions(createMagnitudeOptions(option.value));
          }}
        />
        <SelectHeader>Select magnitude</SelectHeader>
        <Select
          options={magnitudeOptions}
          value={magnitude && { value: magnitude, label: magnitude }}
          onChange={option => {
            setMagnitude(Number(option.value));
          }}
        />
        <PickedColors>
          {pickedColors.length > 0 &&
            pickedColors.map(color => (
              <Swatch
                key={Math.random()}
                color={color.value}
                onClick={() => updatePickedColors(color)}
              />
            ))}
        </PickedColors>
        <SwatchContainer>
          {colors.map(color => (
            <Swatch
              key={Math.random()}
              color={color.value}
              onClick={() => updatePickedColors(color)}
            />
          ))}
        </SwatchContainer>
        <ButtonContainer>
          <Button
            disabled={!(stripeCount && magnitude && pickedColors.length > 0)}
            onClick={createPatterns}
          >
            Create patterns
          </Button>
        </ButtonContainer>
      </SelectContainer>
      <StripesContainer>
        {pickedColors.length > 0 &&
          patterns.length > 0 &&
          patterns.map(pattern => displayPattern(pattern))}
      </StripesContainer>
    </Container>
  );
};

export default App;
