import React, { memo, useState, useEffect } from "react";
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
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 120px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SelectHeader = styled.h5`
  font-weight: 500;
  margin: 0 0 5px 0;
  padding: 0;
`;

const ColorsContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${props =>
    props.disabled &&
    `
  pointer-events: none;
  opacity: 0.5;
  `};
`;

const Swatch = styled.div`
  background: ${props => props.color};
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SwatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  width: 100px;
  height: 60px;
`;

const PickedColorsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PickedColorsLabel = styled.h5`
  font-weight: 500;
  margin: 0 0 5px 0;
  padding: 0;
`;

const PickedColors = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  width: 60px;
  border: 1px solid lightgray;
`;

const PatternsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 550px;
  width: 1100px;
  /* border: 1px solid black; */
  overflow-y: auto;
  padding: 20px;
`;

const PatternContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px 20px 0;
`;

const PatternLabel = styled.h6`
  font-weight: 400;
  margin: 0 0 5px 0;
  padding: 0;
`;

const Pattern = styled.div`
  width: 200px;
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
    <PatternContainer>
      <PatternLabel>{pattern.label}</PatternLabel>
      <Pattern>{patternItems}</Pattern>
    </PatternContainer>
  );
};

// const splitter = arr => {
//   return arr.map(arr2 =>
//     arr2.split("").map(letter => lettersToNumbers[letter])
//   );
// };

// splitter([]);

const Patterns = memo(props => {
  const { patterns } = props;
  return (
    <PatternsContainer>
      {patterns.length > 0 && patterns.map(pattern => displayPattern(pattern))}
    </PatternsContainer>
  );
});

const App = () => {
  const [stripeCount, setStripeCount] = useState(null);
  const [magnitude, setMagnitude] = useState(null);
  const [magnitudeOptions, setMagnitudeOptions] = useState(null);
  const [pickedColors, setPickedColors] = useState([]);
  const [patterns, setPatterns] = useState([]);

  const stripeCountValue = stripeCount ? Number(stripeCount.value) : null;
  const isColorCountValid =
    stripeCountValue % 2 === 0
      ? pickedColors.length > 1 && stripeCountValue >= pickedColors.length
      : pickedColors.length > 0 && stripeCountValue >= pickedColors.length;
  const allChoicesMade = stripeCountValue && magnitude && isColorCountValid;
  const anyChoicesMade = stripeCountValue || magnitude || isColorCountValid;

  const createPatterns = () => {
    const numberPalindromes = createNumberPalindromes(
      stripeCountValue,
      magnitude
    );
    const sequences = colorSequences[stripeCountValue][pickedColors.length];
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
          ${stripeCountValue}m${magnitude}, 
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
      pickedColors.length < stripeCountValue &&
      pickedColors.find(color => color.value === newColor.value) === undefined
    ) {
      if (pickedColors.length < 3) {
        newPickedColors.push(newColor);
      } else if (pickedColors.length === 3) {
        newPickedColors.pop();
        newPickedColors.push(newColor);
      }
    } else if (pickedColors.find(color => color.value === newColor.value)) {
      newPickedColors = pickedColors.filter(
        color => color.value !== newColor.value
      );
    }
    setPickedColors(newPickedColors);
  };

  const reset = () => {
    setStripeCount(null);
    setMagnitude(null);
    setMagnitudeOptions(null);
    setPickedColors([]);
    setPatterns([]);
  };

  const random = () => {
    const randomStripeCount = Math.floor(Math.random() * 8) + 1; // 8 stripes for now
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
  };

  return (
    <Container>
      <MenuContainer>
        <SelectContainer>
          <SelectHeader>Stripes</SelectHeader>
          <Select
            value={stripeCount}
            options={stripeOptions}
            onChange={option => {
              setStripeCount(option);
              setMagnitude(null);
              setMagnitudeOptions(createMagnitudeOptions(option.value));
            }}
          />
        </SelectContainer>
        <SelectContainer>
          <SelectHeader>Magnitude</SelectHeader>
          <Select
            isDisabled={!magnitudeOptions}
            options={magnitudeOptions}
            value={magnitude && { value: magnitude, label: magnitude }}
            onChange={option => {
              setMagnitude(Number(option.value));
            }}
          />
        </SelectContainer>
        <ColorsContainer disabled={!(stripeCountValue && magnitude)}>
          <PickedColorsContainer>
            <PickedColorsLabel>Colors</PickedColorsLabel>
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
          </PickedColorsContainer>
          <SwatchContainer>
            {colors.map(color => (
              <Swatch
                key={Math.random()}
                color={color.value}
                onClick={() => updatePickedColors(color)}
              />
            ))}
          </SwatchContainer>
        </ColorsContainer>
        <ButtonContainer>
          <Button onClick={createPatterns} disabled={!allChoicesMade}>
            Create patterns
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button onClick={random}>Random</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button onClick={reset} disabled={!anyChoicesMade}>
            Reset
          </Button>
        </ButtonContainer>
      </MenuContainer>
      <Patterns patterns={patterns} />
    </Container>
  );
};

export default App;
