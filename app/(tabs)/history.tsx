import React from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import styled from '@emotion/native'
import { MaterialIcons } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'

export default function HistoryScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return <Container isDark={isDark}></Container>
}

const Container = styled(SafeAreaView)<{ isDark: boolean }>`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => (props.isDark ? '#000' : '#fff')};
`

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${(props) => (props.isDark ? '#fff' : '#000')};
`
