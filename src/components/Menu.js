import React from "react";
import Select from "react-select";
import {
  SelectContainer,
  Swatch,
  SwatchesContainer,
  Header,
  // PatternCount,
  Button,
  // PatternCountContainer,
  MenuContainer,
  MenuRow,
  selectStyles,
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
    // patternCount,
    anyChoicesMade,
    allChoicesMade,
    updatePickedColors,
    reset,
    stripeCountValue,
    pickedColors,
    createPatterns,
  } = props;

  return (
    <MenuContainer>
      {/* <MenuRow> */}
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
      {/* </MenuRow> */}
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
            />
          );
        })}
      </SwatchesContainer>
      {/* <MenuRow> */}
      <Button
        onClick={createPatterns}
        disabled={!allChoicesMade}
        style={{
          margin: "0 0 24px 0",
        }}
      >
        MAKE Patterns
      </Button>
      {/* <Button
        onClick={random}
        style={{
          margin: "0 20px 0 0",
        }}
      >
        RANDOM PATTERN
      </Button> */}
      <Button
        onClick={reset}
        disabled={!anyChoicesMade}
        // style={{
        //   margin: "0 20px 0 0",
        // }}
      >
        RESET Selections
      </Button>
      {/* <Button onClick={openModal}>SAVED</Button> */}
      {/* </MenuRow> */}
      {/* <PatternCountContainer>
        <Header>Patterns generated</Header>
        <PatternCount>{patternCount}</PatternCount>
      </PatternCountContainer> */}
    </MenuContainer>
  );
};
