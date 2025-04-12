import React, { useState } from 'react'
import {
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from 'react-native'
import { useColorScheme } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import OpenAI from 'openai'
import styled from '@emotion/native'
import { Hero } from '@/components/Screens/Generate/Hero'

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
})

export default function GenerateScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
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
        model: 'dall-e-3',
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

  return (
    <Container isDark={isDark}>
      {!generatedMeme && <Hero />}

      <MemeContainer>
        {generatedMeme && (
          <MemeImage source={{ uri: generatedMeme }} resizeMode="contain" />
        )}
      </MemeContainer>
      <PromptContainer>
        <Title isDark={isDark}>Generate a Meme</Title>

        <Input
          isDark={isDark}
          placeholder="Enter your meme idea..."
          placeholderTextColor={isDark ? '#999' : '#666'}
          value={prompt}
          onChangeText={setPrompt}
          multiline
        />

        <Button isDark={isDark} onPress={handleGenerate} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <MaterialIcons name="add-a-photo" size={24} color="#fff" />
              <ButtonText>Generate Meme</ButtonText>
            </>
          )}
        </Button>
      </PromptContainer>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  )
}

const Container = styled(SafeAreaView)<{ isDark: boolean }>`
  flex: 1;
  padding: 20px;
  flex-grow: 1;
  background-color: ${(props) => (props.isDark ? '#000' : '#fff')};
`

const MemeContainer = styled.View`
  margin-top: 20px;
  align-items: center;
  gap: 20px;
`

const MemeImage = styled(Image)`
  width: 100%;
  height: 300px;
  border-radius: 8px;
`

const PromptContainer = styled.View`
  flex: 1;
  margin-top: auto;
  width: 100%;
`

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 24px;
  font-weight: bold;
  margin-top: auto;
  margin-bottom: 20px;
  color: ${(props) => (props.isDark ? '#fff' : '#000')};
`

const Input = styled(TextInput)<{ isDark: boolean }>`
  border-width: 1px;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 16px;
  min-height: 100px;
  background-color: ${(props) => (props.isDark ? '#333' : '#f0f0f0')};
  color: ${(props) => (props.isDark ? '#fff' : '#000')};
  border-color: ${(props) => (props.isDark ? '#666' : '#ddd')};
`

const Button = styled(TouchableOpacity)<{ isDark: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 75px;
  background-color: ${(props) => (props.isDark ? '#444' : '#007AFF')};
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 20px;
`
