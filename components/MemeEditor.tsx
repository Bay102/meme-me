import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useColorScheme } from 'react-native'

interface MemeEditorProps {
  editPrompt: string
  setEditPrompt: (text: string) => void
  onSave: () => void
  onCancel: () => void
  loading: boolean
}

export function MemeEditor({
  editPrompt,
  setEditPrompt,
  onSave,
  onCancel,
  loading,
}: MemeEditorProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <View style={styles.editContainer}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#333' : '#f0f0f0',
            color: isDark ? '#fff' : '#000',
            borderColor: isDark ? '#666' : '#ddd',
          },
        ]}
        placeholder="Enter your edit prompt..."
        placeholderTextColor={isDark ? '#999' : '#666'}
        value={editPrompt}
        onChangeText={setEditPrompt}
        multiline
      />
      <View style={styles.editButtons}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isDark ? '#444' : '#007AFF' },
          ]}
          onPress={onSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <MaterialIcons name="save" size={24} color="#fff" />
              <Text style={styles.buttonText}>Apply Edit</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDark ? '#333' : '#999' }]}
          onPress={onCancel}
        >
          <MaterialIcons name="close" size={24} color="#fff" />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer: {
    width: '100%',
    marginTop: 20,
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
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
})
