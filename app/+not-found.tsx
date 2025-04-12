import React from 'react'
import { Link, Stack } from 'expo-router'
import styled from '@emotion/native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

const Container = styled(ThemedView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const StyledLink = styled(Link)`
  margin-top: 15px;
  padding-vertical: 15px;
`

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <StyledLink href="/">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </StyledLink>
      </Container>
    </>
  )
}
