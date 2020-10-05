import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import {
  Container,
  TopHeader,
  TopHeaderButton,
  SavedButtonIconAndText,
  SavedButtonTextContainer,
  SavedButtonText,
  InnerContainer,
} from "../../styles/mobileStyles.js";
import { Home } from "./Home.js";
import { Patterns } from "./Patterns.js";
import { Saved } from "./Saved.js";
import "../../index.css";

export const MobileView = (props) => {
  const renderSwitch = (currentPage) => {
    switch (currentPage) {
      case "home":
        return <Home {...props} />;
      case "patterns":
        return <Patterns {...props} />;
      case "saved":
        return <Saved {...props} />;
      default:
        return <></>;
    }
  };

  return (
    <Container>
      <TopHeader>
        <TopHeaderButton
          ontouchstart=""
          onClick={() => props.setMobileView("home")}
        >
          Home
        </TopHeaderButton>
        <TopHeaderButton
          ontouchstart=""
          onClick={() => props.setMobileView("saved")}
        >
          <SavedButtonIconAndText>
            <FaRegHeart />
            <SavedButtonTextContainer>
              <SavedButtonText>VIEW</SavedButtonText>
              <SavedButtonText>Saved</SavedButtonText>
            </SavedButtonTextContainer>
          </SavedButtonIconAndText>
        </TopHeaderButton>
      </TopHeader>
      <InnerContainer>{renderSwitch(props.mobileView)}</InnerContainer>
    </Container>
  );
};
