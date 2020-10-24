import React from "react";
import Select from "react-select";
import { FaCheck } from "react-icons/fa";
import {
  SelectContainer,
  Swatch,
  SwatchesContainer,
  Header,
  Button,
  MenuContainer,
  selectStyles,
  customWhite,
} from "./desktopAndTabletStyles.js";
import { colors, stripeOptions } from "../../config.js";
import { createMagnitudeOptions } from "../../helpers.js";

export const Menu = (props) => {
  return (
    <MenuContainer>
      <SelectContainer>
        <Header>Stripes</Header>
        <Select
          styles={selectStyles}
          value={props.stripeCount}
          options={stripeOptions}
          onChange={(option) => {
            props.setStripeCount(option);
            props.setMagnitude(null);
            props.setPickedColors([]);
            props.setMagnitudeOptions(createMagnitudeOptions(option.value));
          }}
        />
      </SelectContainer>
      <SelectContainer>
        <Header>Magnitude</Header>
        <Select
          styles={
            props.magnitudeOptions
              ? selectStyles
              : {
                  ...selectStyles,
                  container: (provided, _) => ({
                    ...provided,
                    width: "100%",
                    pointerEvents: "none",
                    opacity: "0.5",
                  }),
                }
          }
          isDisabled={!props.magnitudeOptions}
          options={props.magnitudeOptions}
          value={
            props.magnitude && {
              value: props.magnitude,
              label: props.magnitude,
            }
          }
          onChange={(option) => {
            props.setMagnitude(Number(option.value));
          }}
        />
      </SelectContainer>
      <Header>Color Selection</Header>
      <SwatchesContainer
        disabled={!(props.stripeCountValue && props.magnitude)}
      >
        {colors.map((color, i) => {
          return (
            <Swatch
              key={i}
              color={color.value}
              onClick={() => props.updatePickedColors(color)}
            >
              {!!props.pickedColors.find(
                (pickedColor) => pickedColor.value === color.value
              ) && <FaCheck color={customWhite} size={12} />}
            </Swatch>
          );
        })}
      </SwatchesContainer>
      <Button onClick={props.createPatterns} disabled={!props.allChoicesMade}>
        MAKE Patterns
      </Button>
      <Button onClick={props.reset} disabled={!props.anyChoicesMade}>
        RESET Selections
      </Button>
    </MenuContainer>
  );
};
