import React, { memo, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Select from "react-select";
import { FixedSizeGrid as Grid } from "react-window";
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

const Header = styled.h5`
  font-weight: 500;
  margin: 0 0 5px 0;
  padding: 0;
`;

const SwatchContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

  ${props =>
    props.disabled &&
    `
  pointer-events: none;
  opacity: 0.5;
  `}
`;

const Swatch = styled.div`
  background: ${props => props.color};
  border: 2px solid ${props => (props.isPicked ? `limegreen` : `white`)};
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

// const PatternsContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-content: flex-start;
//   flex-wrap: wrap;
//   height: 550px;
//   width: 1100px;
//   overflow-y: auto;
//   padding: 20px;
// `;

const Pattern = styled.div`
  width: 200px;
  /* transition: transform 0.2s; */
`;

const PatternContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 0 20px 20px 0; */
  margin: 1px;
  height: fit-content;

  /* &:hover ${Pattern} {
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.4s;
  } */
`;

const PatternLabel = styled.h6`
  font-weight: 400;
  margin: 0 0 5px 0;
  padding: 0;
`;

const Button = styled.button`
  ${props =>
    !props.disabled &&
    `
    cursor: pointer;
  `}
`;

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

const PatternCountContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const PatternCount = styled.p`
  font-weight: 500;
  font-size: 24px;
  margin: 0 0 5px 0;
  padding: 0;
`;

const selectStyles = {
  control: (provided, _) => ({
    ...provided,
    cursor: "pointer"
  }),
  option: (provided, _) => ({
    ...provided,
    cursor: "pointer"
  })
};

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

// const splitter = arr => {
//   return arr.map(arr2 =>
//     arr2.split("").map(letter => lettersToNumbers[letter])
//   );
// };

// splitter([]);

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

class ItemRenderer extends React.PureComponent {
  render() {
    const { columnIndex, data, rowIndex } = this.props;
    console.log(data[rowIndex][columnIndex]);
    return displayPattern(data[rowIndex][columnIndex]);
  }
}

const App = () => {
  const [stripeCount, setStripeCount] = useState(null);
  const [magnitude, setMagnitude] = useState(null);
  const [magnitudeOptions, setMagnitudeOptions] = useState(null);
  const [pickedColors, setPickedColors] = useState([]);
  const [patterns, setPatterns] = useState([]);

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

  const convertTo2D = array => {
    let result = [];
    let i = 0;

    while (i < array.length) {
      result.push(array.slice(i, i + 4));
      i += 4;
    }
    return result;
  };

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

    const converted = convertTo2D(results);

    if (randomMode.current) {
      setPatterns([[results[Math.floor(Math.random() * results.length)]]]);
    } else {
      setPatterns(converted);
    }
  };

  const updatePickedColors = newColor => {
    let newPickedColors = pickedColors.map(color => ({ ...color }));

    if (pickedColors.find(color => color.value === newColor.value)) {
      newPickedColors = pickedColors.filter(
        color => color.value !== newColor.value
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
    randomMode.current = true;
  };

  return (
    <Container>
      <MenuContainer>
        <SelectContainer>
          <Header>Stripes</Header>
          <Select
            styles={selectStyles}
            value={stripeCount}
            options={stripeOptions}
            onChange={option => {
              setStripeCount(option);
              setMagnitude(null);
              setPickedColors([]);
              setMagnitudeOptions(createMagnitudeOptions(option.value));
            }}
          />
        </SelectContainer>
        <SelectContainer>
          <Header>Magnitude</Header>
          <Select
            styles={selectStyles}
            isDisabled={!magnitudeOptions}
            options={magnitudeOptions}
            value={magnitude && { value: magnitude, label: magnitude }}
            onChange={option => {
              setMagnitude(Number(option.value));
            }}
          />
        </SelectContainer>
        <SwatchContainer disabled={!(stripeCountValue && magnitude)}>
          {colors.map(color => {
            return (
              <Swatch
                key={Math.random()}
                color={color.value}
                onClick={() => updatePickedColors(color)}
                isPicked={
                  !!pickedColors.find(
                    pickedColor => pickedColor.value === color.value
                  )
                }
              />
            );
          })}
        </SwatchContainer>
        <ButtonContainer>
          <Button onClick={createPatterns} disabled={!allChoicesMade}>
            Create patterns
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button onClick={random}>Random pattern</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button onClick={reset} disabled={!anyChoicesMade}>
            Reset
          </Button>
        </ButtonContainer>
        <PatternCountContainer>
          <Header>Patterns generated</Header>
          <PatternCount>{patterns.length}</PatternCount>
        </PatternCountContainer>
      </MenuContainer>
      {/* <Patterns patterns={patterns} /> */}
      {patterns.length > 0 && (
        <Grid
          itemData={patterns}
          columnCount={patterns[0].length}
          rowCount={patterns.length}
          columnWidth={200}
          height={550}
          rowHeight={200}
          width={800}
        >
          {ItemRenderer}
        </Grid>
      )}
    </Container>
  );
};

export default App;
