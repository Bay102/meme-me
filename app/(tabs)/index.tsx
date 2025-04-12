import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { useColorScheme } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import OpenAI from 'openai'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Hero } from '@/components/Screens/Generate/Hero'

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
})

export default function GenerateScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const insets = useSafeAreaInsets()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }
    setGeneratedMeme(null)
    setPrompt('')
    setLoading(true)
    setError(null)

    try {
      const response = await openai.images.generate({
        model: 'dall-e-2',
        prompt: `Create a funny meme about: ${prompt}`,
        n: 1,
        size: '1024x1024',
      })

      if (response.data[0]?.url) {
        setGeneratedMeme(response.data[0].url)
      } else {
        setError('Failed to generate meme')
      }
    } catch (err) {
      setError('An error occurred while generating the meme')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNewMeme = () => {}

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#000' : '#fff',
        },
      ]}
    >
      {!generatedMeme && <Hero />}

      <View style={styles.memeContainer}>
        {generatedMeme && (
          <Image
            source={{ uri: generatedMeme }}
            style={styles.memeImage}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.promptContainer}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          Generate a Meme
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#333' : '#f0f0f0',
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? '#666' : '#ddd',
            },
          ]}
          placeholder="Enter your meme idea..."
          placeholderTextColor={isDark ? '#999' : '#666'}
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isDark ? '#444' : '#007AFF' },
          ]}
          onPress={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <MaterialIcons name="add-a-photo" size={24} color="#fff" />
              <Text style={styles.buttonText}>Generate Meme</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 100,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 75,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  memeContainer: {
    marginTop: 20,
    alignItems: 'center',
    gap: 20,
  },
  memeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memeImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  promptContainer: {
    flex: 1,
    marginTop: 'auto',
    width: '100%',
  },
})
