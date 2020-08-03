import React from "react";
import Select from "react-select";
import {
  SelectContainer,
  Swatch,
  SwatchesContainer,
  Header,
  Check,
  Button,
  MenuContainer,
  selectStyles,
  // PatternCount,
  // PatternCountContainer,
} from "../styles.js";
import { colors, stripeOptions } from "../config.js";
import { createMagnitudeOptions } from "../helpers.js";

export const Menu = (props) => {
  const {
    magnitude,
    setMagnitude,
    setMagnitudeOptions,
    setStripeCount,
    setPickedColors,
    stripeCount,
    magnitudeOptions,
    anyChoicesMade,
    allChoicesMade,
    updatePickedColors,
    reset,
    stripeCountValue,
    pickedColors,
    createPatterns,
    // patternCount,
  } = props;

  return (
    <MenuContainer>
      <SelectContainer>
        <Header>Stripes</Header>
        <Select
          styles={selectStyles}
          value={stripeCount}
          options={stripeOptions}
          onChange={(option) => {
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
          onChange={(option) => {
            setMagnitude(Number(option.value));
          }}
        />
      </SelectContainer>
      <Header>Color Selection</Header>
      <SwatchesContainer disabled={!(stripeCountValue && magnitude)}>
        {colors.map((color, i) => {
          return (
            <Swatch
              key={i}
              color={color.value}
              onClick={() => updatePickedColors(color)}
              isPicked={
                !!pickedColors.find(
                  (pickedColor) => pickedColor.value === color.value
                )
              }
            >
              <Check>✔</Check>
            </Swatch>
          );
        })}
      </SwatchesContainer>
      <Button onClick={createPatterns} disabled={!allChoicesMade}>
        MAKE Patterns
      </Button>
      <Button onClick={reset} disabled={!anyChoicesMade}>
        RESET Selections
      </Button>
      {/* <PatternCountContainer>
        <Header>Patterns generated</Header>
        <PatternCount>{patternCount}</PatternCount>
      </PatternCountContainer> */}
    </MenuContainer>
  );
};
