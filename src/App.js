import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import {
  colors,
  maxMagnitude,
  stripeOptions,
  colorSequences
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
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
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
  border-bottom: 1px solid black;
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

const createStripe = (count, color) => {
  let stripe = [];

  for (let i = 1; i <= count; i++) {
    stripe.push(<Stripe key={Math.random()} color={color} />);
  }

  return stripe;
};

const App = () => {
  const [stripeCount, setStripeCount] = useState(null);
  const [magnitude, setMagnitude] = useState(null);
  const [magnitudeOptions, setMagnitudeOptions] = useState(null);
  const [numberPalindromes, setNumberPalindromes] = useState([]);
  const [pickedColors, setPickedColors] = useState([]);
  const [colorSequence, setColorSequence] = useState([]);

  useEffect(() => {
    console.log("numberPalindromes", numberPalindromes);
    console.log("colorSequences", colorSequence);
    console.log("pickedColors", pickedColors);
  });

  const makeArrays = () => {
    setNumberPalindromes(createNumberPalindromes(stripeCount, magnitude));
    setColorSequence(colorSequences[stripeCount][pickedColors.length]);
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

  const updatePickedColors = newColor => {
    let newPickedColors = JSON.parse(JSON.stringify(pickedColors));
    if (
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

  const createPatternObjects = () => {
    const results = [];

    for (let i = 0; i < colorSequences.length; i++) {
      // transform array of arrays of number into array of arrays of color/count objects
    }

    return results;
  };

  const createPattern = sequence => {
    let pattern = [];

    for (let i = 0; i < sequence.length; i++) {
      const { count, color } = sequence[i];
      pattern.push(createStripe(count, color.value));
    }

    return <Pattern>{pattern}</Pattern>;
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
          {stripeCount && magnitude && colorSequences && (
            <Button onClick={makeArrays}>Make arrays</Button>
          )}
        </ButtonContainer>
      </SelectContainer>
      <StripesContainer>
        {/* {pickedColors.length > 0 &&
          setNumberPalindromes.map(sequence => createPattern(sequence))} */}
      </StripesContainer>
    </Container>
  );
};

export default App;
