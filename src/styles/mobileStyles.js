import styled from "styled-components";

export const customWhite = "#f6f7f4";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TopHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: space-between;
  border-bottom: 4px solid black;
  padding: 0 8px;
`;

export const Header = styled.h2`
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
  padding: 0;
  color: black;
  text-decoration: underline;
`;

export const TopHeaderButton = styled.button`
  color: black;
  background: ${customWhite};
  border: none;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  width: fit-content;
  letter-spacing: 1px;

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.disabled
      ? `
          pointer-events: none;
          opacity: 0.5;
        `
      : `
          background: ${customWhite};
          cursor: pointer;
        `}
`;

export const SavedButtonIconAndText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SavedButtonTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  align-items: flex-start;
`;

export const SavedButtonText = styled.div`
  font-size: 11px;
  line-height: 16px;
  font-weight: 700;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 48px 0 48px;
  height: 100%;
  overflow-y: auto;
`;

export const Title = styled.h1`
  font-size: 25px;
  line-height: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: black;
`;

export const SelectRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  width: 100%;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const SwatchesContainer = styled.div`
  display: flex;
  align-content: flex-start;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 0 8px 0;

  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      opacity: 0.5;
    `}
`;

export const Check = styled.div`
  color: ${customWhite};
  visibility: hidden;
  font-size: 25px;
  line-height: 32px;
  font-weight: 700;
`;

export const Swatch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
  width: 20%;
  height: 34px;
  margin: 0 8px 8px 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: 0.2s;
  }

  &:active {
    opacity: 1;
  }

  ${(props) =>
    props.isPicked &&
    `
      ${Check} {
        visibility: visible;
      }
  `};
`;

export const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  padding-bottom: 16px;
`;

export const Button = styled.button`
  color: black;
  background: ${customWhite};
  box-shadow: 4px 4px black;
  border: 2px solid black;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 24px 0;
  letter-spacing: 1px;

  &:active {
    transform: translate(4px, 4px);
    box-shadow: none;
    transition: 0.1s;
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.disabled
      ? `
          pointer-events: none;
          opacity: 0.5;
        `
      : `
          background: ${customWhite};
          cursor: pointer;
        `}
`;
