import React from 'react'
import styled from '@emotion/native'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const StyledText = styled.Text``

export default function Settings() {
  return (
    <Container>
      <StyledText>Settings</StyledText>
    </Container>
  )
}
