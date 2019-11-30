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
