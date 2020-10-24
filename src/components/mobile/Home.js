import React from "react";
import Select from "react-select";
import { FaRandom, FaTimes, FaCheck } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

import {
  Title,
  SelectRowContainer,
  Header,
  SelectContainer,
  SwatchesContainer,
  Swatch,
  Button,
  ButtonsRow,
} from "./mobileStyles.js";
import {
  selectStyles,
  customWhite,
} from "../desktopAndTablet/desktopAndTabletStyles.js";
import { createMagnitudeOptions } from "../../helpers.js";
import { colors, stripeOptions } from "../../config.js";

export const Home = (props) => {
  const isGalaxyFold = useMediaQuery({
    query: "(max-device-width: 280px)",
  });

  const selectStylesOverride = isGalaxyFold
    ? {
        ...selectStyles,
        placeholder: (provided, _) => ({
          ...provided,
          color: "inherit",
          fontSize: "12px",
          display: "none",
        }),
      }
    : selectStyles;

  return (
    <>
      <Title>MATHIEU'S ATHLETIC STRIPE PATTERN GENERATOR</Title>
      <SelectRowContainer>
        <SelectContainer style={{ paddingRight: "16px" }}>
          <Header>Stripes</Header>
          <Select
            styles={selectStylesOverride}
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
        <SelectContainer style={{ paddingLeft: "16px" }}>
          <Header>Magnitude</Header>
          <Select
            styles={
              props.magnitudeOptions
                ? selectStylesOverride
                : {
                    ...selectStylesOverride,
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
      </SelectRowContainer>
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
              ) && <FaCheck color={customWhite} />}
            </Swatch>
          );
        })}
      </SwatchesContainer>
      <ButtonsRow>
        <Button
          style={{ marginRight: "16px", flex: "3" }}
          onClick={props.createPatterns}
          disabled={!props.allChoicesMade}
        >
          MAKE
        </Button>
        <Button
          style={{ marginRight: "16px", flex: "1" }}
          onClick={props.reset}
          disabled={!props.anyChoicesMade}
        >
          <FaTimes style={{ position: "relative", top: "2px" }} />
        </Button>
        <Button style={{ flex: "1" }} onClick={props.random}>
          <FaRandom style={{ position: "relative", top: "2px" }} />
        </Button>
      </ButtonsRow>
    </>
  );
};
