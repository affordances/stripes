import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const MenuRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Header = styled.h5`
  font-weight: 500;
  margin: 0 0 5px 0;
  padding: 0;
`;

export const SwatchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

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

export const Button = styled.button`
  flex: 1;

  ${(props) =>
    !props.disabled &&
    `
    cursor: pointer;
  `}
`;

export const PatternContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PatternLabel = styled.h6`
  font-weight: 400;
  margin: 0 0 5px 0;
  padding: 0;
`;

export const Pattern = styled.div`
  border: 1px solid black;
  margin-right: 20px;
  width: 260px;
`;

export const Stripe = styled.div`
  background: ${(props) => props.color};
  height: 10px;
`;

export const PatternCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
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
