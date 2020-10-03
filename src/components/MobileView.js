import React, { useState } from "react";
import Select from "react-select";
import { FaHeart, FaRegHeart, FaRandom, FaTimes } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

import {
  Container,
  TopHeader,
  TopHeaderButton,
  SavedButtonIconAndText,
  SavedButtonTextContainer,
  SavedButtonText,
  InnerContainer,
  Title,
  SelectRowContainer,
  Header,
  SelectContainer,
  SwatchesContainer,
  Swatch,
  Check,
  Button,
  ButtonsRow,
} from "../styles/mobileStyles.js";
import { selectStyles } from "../styles/desktopAndTabletStyles.js";
import { colors, stripeOptions } from "../config.js";
import { createMagnitudeOptions } from "../helpers.js";
import "../index.css";

export const MobileView = (props) => {
  const isGalaxyFold = useMediaQuery({
    query: "(max-device-width: 280px)",
  });
  const [displaySaved, setDisplaySaved] = useState(false);
  const {
    patterns,
    magnitude,
    pickedColors,
    random,
    stripeCountValue,
    patternCount,
    toggleSavedPattern,
    isPatternSaved,
    savedPatterns,
    clearSavedPatterns,
    stripeCount,
    setStripeCount,
    setMagnitude,
    setPickedColors,
    setMagnitudeOptions,
    magnitudeOptions,
    updatePickedColors,
    createPatterns,
    allChoicesMade,
    reset,
    anyChoicesMade,
  } = props;

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
    <Container>
      <TopHeader>
        <TopHeaderButton ontouchstart="" onClick={() => setDisplaySaved(false)}>
          Home
        </TopHeaderButton>
        <TopHeaderButton ontouchstart="" onClick={() => setDisplaySaved(true)}>
          <SavedButtonIconAndText>
            <FaRegHeart />
            <SavedButtonTextContainer>
              <SavedButtonText>VIEW</SavedButtonText>
              <SavedButtonText>Saved</SavedButtonText>
            </SavedButtonTextContainer>
          </SavedButtonIconAndText>
        </TopHeaderButton>
      </TopHeader>
      {displaySaved ? (
        <InnerContainer>
          <Title>Saved Patterns</Title>
        </InnerContainer>
      ) : (
        <InnerContainer>
          <Title>Mathieu's Athletic Stripe Pattern Generator</Title>
          <SelectRowContainer>
            <SelectContainer style={{ paddingRight: "16px" }}>
              <Header>Stripes</Header>
              <Select
                styles={selectStylesOverride}
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
            <SelectContainer style={{ paddingLeft: "16px" }}>
              <Header>Magnitude</Header>
              <Select
                styles={
                  magnitudeOptions
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
                isDisabled={!magnitudeOptions}
                options={magnitudeOptions}
                value={magnitude && { value: magnitude, label: magnitude }}
                onChange={(option) => {
                  setMagnitude(Number(option.value));
                }}
              />
            </SelectContainer>
          </SelectRowContainer>
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
          <ButtonsRow>
            <Button
              style={{ marginRight: "16px", flex: "3" }}
              onClick={createPatterns}
              disabled={!allChoicesMade}
            >
              MAKE
            </Button>
            <Button
              style={{ marginRight: "16px", flex: "1" }}
              onClick={reset}
              disabled={!anyChoicesMade}
            >
              <FaTimes style={{ position: "relative", top: "2px" }} />
            </Button>
            <Button style={{ flex: "1" }} onClick={random}>
              <FaRandom style={{ position: "relative", top: "2px" }} />
            </Button>
          </ButtonsRow>
        </InnerContainer>
      )}
    </Container>
  );
};
