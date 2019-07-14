import React from 'react'
import styled from 'styled-components'
import { GlobalStyle } from 'styles/Index'

const Container = styled.div`
  max-width: 200px;
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
}
`

const Title = styled.h2`
  text-align: center;
`

const Description = styled.p`
  text-align: center;
`

function App() {
  return (
    <Container>
      <GlobalStyle />
      <div>
        <Title>Hello World!!</Title>
        <Description>This is a sample of ES6 + TypeScript + React for Electron.</Description>
      </div>
    </Container>
  )
}

export default App
