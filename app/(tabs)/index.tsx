import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useColorScheme } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <MaterialIcons
        name="sentiment-satisfied-alt"
        size={80}
        color={isDark ? '#fff' : '#000'}
      />
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        Welcome to Meme-Me!
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#666' }]}>
        Generate hilarious memes with AI
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
})
