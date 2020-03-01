import React, { memo, useState, useEffect, useRef } from "react";
import Select from "react-select";
import { FixedSizeGrid as Grid } from "react-window";
import {
  SelectContainer,
  Stripe,
  Swatch,
  SwatchContainer,
  Header,
  Pattern,
  PatternContainer,
  PatternCount,
  PatternLabel,
  Button,
  ButtonContainer,
  PatternCountContainer,
  Container,
  MenuContainer,
  selectStyles
} from "./styles.js";
import {
  colors,
  stripeOptions,
  colorSequences,
  numbersToLetters
} from "./config.js";
import {
  createMagnitudeOptions,
  createNumberPalindromes,
  convertTo2D
} from "./helpers.js";
import "./index.css";

const PatternRenderer = memo(props => {
  const { columnIndex, data, rowIndex, ...otherProps } = props;
  const currentPattern = data[rowIndex][columnIndex];

  return currentPattern ? (
    <PatternContainer {...otherProps}>
      <PatternLabel>{currentPattern.label}</PatternLabel>
      <Pattern>
        {currentPattern.pattern.flatMap(({ count, color }) =>
          new Array(count).fill(<Stripe color={color.value} />)
        )}
      </Pattern>
    </PatternContainer>
  ) : null;
});

const App = () => {
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
          label: `${stripeCountValue}m${magnitude}, ${numberPalindromes[i].join(
            "/"
          )}, ${sequences[j].map(num => numbersToLetters[num]).join("")}`,
          pattern
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
          <PatternCount>{patternCount}</PatternCount>
        </PatternCountContainer>
      </MenuContainer>
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
          {PatternRenderer}
        </Grid>
      )}
    </Container>
  );
};

export default App;
