import React from "react";
import Select from "react-select";
import {
  SelectContainer,
  Swatch,
  SwatchContainer,
  Header,
  PatternCount,
  Button,
  PatternCountContainer,
  MenuContainer,
  MenuRow,
  selectStyles,
} from "./styles.js";
import { colors, stripeOptions } from "./config.js";
import { createMagnitudeOptions } from "./helpers.js";

export const Menu = (props) => {
  const {
    magnitude,
    setMagnitude,
    setMagnitudeOptions,
    setStripeCount,
    setPickedColors,
    stripeCount,
    magnitudeOptions,
    patternCount,
    anyChoicesMade,
    allChoicesMade,
    updatePickedColors,
    reset,
    random,
    stripeCountValue,
    pickedColors,
    createPatterns,
  } = props;

  return (
    <MenuContainer>
      <MenuRow>
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
      </MenuRow>
      <SwatchContainer disabled={!(stripeCountValue && magnitude)}>
        {colors.map((color) => {
          return (
            <Swatch
              key={Math.random()}
              color={color.value}
              onClick={() => updatePickedColors(color)}
              isPicked={
                !!pickedColors.find(
                  (pickedColor) => pickedColor.value === color.value
                )
              }
            />
          );
        })}
      </SwatchContainer>
      <MenuRow>
        <Button onClick={createPatterns} disabled={!allChoicesMade}>
          Create patterns
        </Button>
        <Button onClick={random}>Random pattern</Button>
        <Button onClick={reset} disabled={!anyChoicesMade}>
          Reset
        </Button>
      </MenuRow>
      <PatternCountContainer>
        <Header>Patterns generated</Header>
        <PatternCount>{patternCount}</PatternCount>
      </PatternCountContainer>
    </MenuContainer>
  );
};
