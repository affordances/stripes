import React from "react";
import Select from "react-select";
import {
  SelectContainer,
  Swatch,
  SwatchContainer,
  Header,
  PatternCount,
  Button,
  ButtonContainer,
  PatternCountContainer,
  MenuContainer,
  selectStyles,
} from "./styles.js";
import { colors, stripeOptions } from "./config.js";
import { createMagnitudeOptions } from "./helpers.js";
import { useStripes } from "./hooks.js";

export const Menu = () => {
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
  } = useStripes();

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
  );
};
