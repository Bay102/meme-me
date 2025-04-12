import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'
import { MemeEditor } from './MemeEditor'

interface GeneratedMemeProps {
  memeUrl: string
  isEditing: boolean
  editPrompt: string
  setEditPrompt: (text: string) => void
  onEdit: () => void
  onSaveEdit: () => void
  onCancelEdit: () => void
  loading: boolean
}

export function GeneratedMeme({
  memeUrl,
  isEditing,
  editPrompt,
  setEditPrompt,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  loading,
}: GeneratedMemeProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <View style={styles.memeContainer}>
      <Text style={[styles.memeTitle, { color: isDark ? '#fff' : '#000' }]}>
        Your Generated Meme
      </Text>
      <Image
        source={{ uri: memeUrl }}
        style={styles.memeImage}
        resizeMode="contain"
      />
      {!isEditing ? (
        <TouchableOpacity
          style={[
            styles.editButton,
            { backgroundColor: isDark ? '#444' : '#007AFF' },
          ]}
          onPress={onEdit}
        >
          <MaterialIcons name="edit" size={24} color="#fff" />
          <Text style={styles.buttonText}>Edit Meme</Text>
        </TouchableOpacity>
      ) : (
        <MemeEditor
          editPrompt={editPrompt}
          setEditPrompt={setEditPrompt}
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
          loading={loading}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  memeContainer: {
    marginTop: 20,
    alignItems: 'center',
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})
