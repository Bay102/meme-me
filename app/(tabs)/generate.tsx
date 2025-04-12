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
import { GeneratedMeme } from '@/components/GeneratedMeme'

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
})

export default function GenerateScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const insets = useSafeAreaInsets()
  const [prompt, setPrompt] = useState('')
  const [editPrompt, setEditPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleGenerate = async (isEdit: boolean = false) => {
    const currentPrompt = isEdit ? editPrompt : prompt
    if (!currentPrompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `Create a funny meme about: ${currentPrompt}${
          isEdit ? ' (make adjustments to the previous image)' : ''
        }`,
        n: 1,
        size: '1024x1024',
      })

      if (response.data[0]?.url) {
        setGeneratedMeme(response.data[0].url)
        if (isEdit) {
          setIsEditing(false)
          setEditPrompt('')
        }
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

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    handleGenerate(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditPrompt('')
  }

  const handleNewMeme = () => {
    setGeneratedMeme(null)
    setPrompt('')
    setEditPrompt('')
    setIsEditing(false)
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + 20,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {generatedMeme ? (
          <>
            <GeneratedMeme
              memeUrl={generatedMeme}
              isEditing={isEditing}
              editPrompt={editPrompt}
              setEditPrompt={setEditPrompt}
              onEdit={handleEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              loading={loading}
            />
            {!isEditing && (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: isDark ? '#444' : '#007AFF' },
                ]}
                onPress={handleNewMeme}
              >
                <MaterialIcons name="add-a-photo" size={24} color="#fff" />
                <Text style={styles.buttonText}>Generate New Meme</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
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

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isDark ? '#444' : '#007AFF' },
              ]}
              onPress={() => handleGenerate(false)}
              disabled={loading}
            >
              {loading && !isEditing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <MaterialIcons name="add-a-photo" size={24} color="#fff" />
                  <Text style={styles.buttonText}>Generate Meme</Text>
                </>
              )}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 'auto',
    marginBottom: 20,
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
    marginBottom: 20,
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
})
