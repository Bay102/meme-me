import { MaterialIcons } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'
import { useColorScheme } from 'react-native'
export const Hero = () => {
  const isDark = useColorScheme() === 'dark'

  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
})
