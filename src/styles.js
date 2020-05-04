import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 120px;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Header = styled.h5`
  font-weight: 500;
  margin: 0 0 5px 0;
  padding: 0;
`;

export const SwatchContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

  ${(props) =>
    props.disabled &&
    `
  pointer-events: none;
  opacity: 0.5;
  `}
`;

export const Swatch = styled.div`
  background: ${(props) => props.color};
  border: 2px solid ${(props) => (props.isPicked ? `limegreen` : `white`)};
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const Pattern = styled.div`
  width: 200px;
`;

export const PatternContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: fit-content;
`;

export const PatternLabel = styled.h6`
  font-weight: 400;
  margin: 0 0 5px 0;
  padding: 0;
`;

export const Button = styled.button`
  ${(props) =>
    !props.disabled &&
    `
    cursor: pointer;
  `}
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Stripe = styled.div`
  background: ${(props) => props.color};
  height: 5px;
`;

export const PatternCountContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const PatternCount = styled.p`
  font-weight: 500;
  font-size: 24px;
  margin: 0 0 5px 0;
  padding: 0;
`;

export const selectStyles = {
  control: (provided, _) => ({
    ...provided,
    cursor: "pointer",
  }),
  option: (provided, _) => ({
    ...provided,
    cursor: "pointer",
  }),
};
