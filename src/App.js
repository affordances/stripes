import React from 'react'
import styled from 'styled-components'
import './index.css';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StripesContainer = styled.div`
`

const Stripe = styled.div`
  background: ${props => props.color}
  height: 38px;
  width: 600px;
`
// 7/12(1-1-1-6-1-1-1)/2(ABXAXBA)
// number of stripes (each may be comprised of one or more units)
// total number of units
// units assigned to each stripe, top to bottom
// how many colors are used
// color of each stripe, top to bottom

// write a function that takes two numbers as input, x and y
// x should be less than or equal to y
// both x and y should be greater than or equal to 1
// both x and y should be less than or equal to 16
// it should return a palindromic array of length x that adds up to y

function App() {
  const colors = {
    'red': '#367da2',
    'blue': '#e93f36',
    'black': 'black'
  }

  const stripeBox = ['red', 'blue', 'black'];

  return (
    <Container>
      <StripesContainer>
        {stripeBox.map((stripe, i) => (
            <Stripe key={i} color={colors[stripeBox[i]]} />
          )
        )}
        </StripesContainer>
    </Container>
  );
}

export default App
