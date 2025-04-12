import React from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import { useColorScheme } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

// This would typically come from a database or storage
const mockHistory = [
  { id: '1', prompt: 'Funny cat meme', date: '2024-03-20' },
  { id: '2', prompt: 'Office meme', date: '2024-03-19' },
]

export default function HistoryScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const renderItem = ({ item }: { item: (typeof mockHistory)[0] }) => (
    <View
      style={[
        styles.historyItem,
        { backgroundColor: isDark ? '#333' : '#f0f0f0' },
      ]}
    >
      <MaterialIcons
        name="history"
        size={24}
        color={isDark ? '#fff' : '#000'}
      />
      <View style={styles.itemContent}>
        <Text style={[styles.prompt, { color: isDark ? '#fff' : '#000' }]}>
          {item.prompt}
        </Text>
        <Text style={[styles.date, { color: isDark ? '#999' : '#666' }]}>
          {item.date}
        </Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        Generation History
      </Text>

      <FlatList
        data={mockHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemContent: {
    marginLeft: 15,
    flex: 1,
  },
  prompt: {
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    marginTop: 4,
  },
})
